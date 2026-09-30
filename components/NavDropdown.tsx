"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Copy } from "lucide-react";
import { featuredBuild, type CopyItem, type MenuColumn, type NavMenu } from "./nav-links";

/** Grace period for the pointer to travel from the trigger into the panel. */
const HOVER_CLOSE_MS = 150;
const COPY_FEEDBACK_MS = 2000;

const panelId = (menu: NavMenu) => `${menu.id}-menu`;

/* ------------------------------------------------------------------ items */

const iconBox =
  "flex size-9 shrink-0 items-center justify-center rounded border border-line bg-card transition-colors duration-fast";

function CopyRow({ item }: { item: CopyItem }) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");
  const valueRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(item.value);
      setStatus("copied");
    } catch {
      // Clipboard API unavailable (e.g. insecure context): select it for Ctrl+C instead.
      const range = document.createRange();
      if (valueRef.current) range.selectNodeContents(valueRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      setStatus("manual");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), COPY_FEEDBACK_MS);
  };

  const Icon = item.icon;
  return (
    <div className="-mx-2 flex items-start gap-3 p-2">
      <span className={iconBox}>
        <Icon aria-hidden className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-body-sm font-semibold">{item.label}</span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span ref={valueRef} className="select-all font-mono text-log">
            {item.value}
          </span>
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${item.value}`}
            className="inline-flex items-center gap-1 rounded border border-line px-1.5 py-0.5 font-mono text-label-sm uppercase text-muted transition-colors duration-fast hover:border-line-strong hover:text-ink"
          >
            {status === "copied" ? <Check aria-hidden className="size-3" /> : <Copy aria-hidden className="size-3" />}
            {status === "copied" ? "Copied" : "Copy"}
          </button>
        </span>
        <span aria-live="polite" className="sr-only">
          {status === "copied" ? "Email address copied" : status === "manual" ? "Selected — press Ctrl+C to copy" : ""}
        </span>
      </span>
    </div>
  );
}

function Column({ column, hideTitle, onNavigate }: { column: MenuColumn; hideTitle?: boolean; onNavigate: () => void }) {
  return (
    <div>
      {column.title && !hideTitle && <p className="mb-4 font-mono text-label uppercase text-muted">{column.title}</p>}
      <ul className="flex flex-col gap-1">
        {column.items.map((item) =>
          item.kind === "copy" ? (
            <li key={item.label}>
              <CopyRow item={item} />
            </li>
          ) : (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={onNavigate}
                className="group -mx-2 flex items-start gap-3 rounded p-2 transition-colors duration-fast hover:bg-card"
              >
                <span className={`${iconBox} group-hover:border-line-strong`}>
                  <item.icon aria-hidden className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-body-sm font-semibold">
                    {item.label}
                    {item.soon && <span className="ml-2 font-mono text-label-sm uppercase text-muted">Soon</span>}
                  </span>
                  <span className="block text-body-sm text-ink/60">{item.description}</span>
                </span>
              </a>
            </li>
          ),
        )}
      </ul>
      {column.footer && (
        <a
          href={column.footer.href}
          onClick={onNavigate}
          className="group mt-3 flex items-center gap-1.5 border-t border-line pt-3 font-mono text-label uppercase text-ink/75 transition-colors duration-fast hover:text-ink"
        >
          {column.footer.label}
          <ArrowRight aria-hidden className="size-3.5 transition-transform duration-fast group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </a>
      )}
    </div>
  );
}

/** Same construction as the hero's payload panel: notched border, mono header row, content below. */
function FeaturedCard({ onNavigate }: { onNavigate: () => void }) {
  const steps = featuredBuild.flow.split(" → ");
  return (
    <a
      href={featuredBuild.href}
      onClick={onNavigate}
      className="notch-sm group flex flex-col border border-line bg-card transition-colors duration-fast hover:border-line-strong focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
    >
      <span className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
        <span className="font-mono text-label uppercase">{featuredBuild.label}</span>
        <ArrowUpRight aria-hidden className="size-4 text-muted transition-colors duration-fast group-hover:text-ink" />
      </span>
      <span className="flex flex-col gap-2 p-4">
        <span className="text-body-sm font-semibold">{featuredBuild.title}</span>
        <span className="font-mono text-log text-ink/75">
          {steps.map((step, i) => (
            <span key={step}>
              {i > 0 && <span className="text-muted"> → </span>}
              {step}
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}

/** Column contents shared by the desktop panel and the mobile section. */
function MenuBody({ menu, onNavigate, mobile }: { menu: NavMenu; onNavigate: () => void; mobile?: boolean }) {
  return (
    <>
      {menu.columns.map((column, i) => (
        // On mobile a column titled like its menu is redundant under the menu's own button.
        <Column key={i} column={column} hideTitle={mobile && column.title === menu.label} onNavigate={onNavigate} />
      ))}
      {menu.featured && (
        <div className={mobile ? "" : "col-span-2 lg:col-span-1"}>
          <FeaturedCard onNavigate={onNavigate} />
        </div>
      )}
    </>
  );
}

/* --------------------------------------------------------------- desktop */

/**
 * Disclosure button + overlay panel (absolute, so nothing shifts). Menus with
 * several columns get a full-width band; single-column menus get a compact
 * panel anchored under their trigger.
 *
 * Opens on mouse hover, or click/Enter/Space. Closes on Escape, outside click,
 * focus leaving it, or navigating. Focus is never trapped. `open` is owned by
 * the Nav so only one menu is open at a time.
 */
export function NavDropdown({
  menu,
  open,
  onOpenChange,
}: {
  menu: NavMenu;
  open: boolean;
  /** Stable callback owned by the Nav: (menu id, open). */
  onOpenChange: (id: string, open: boolean) => void;
}) {
  const openedBy = useRef<"hover" | "click" | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const wrapRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wide = menu.columns.length + (menu.featured ? 1 : 0) > 1;
  const id = panelId(menu);

  const show = useCallback(
    (by: "hover" | "click") => {
      window.clearTimeout(closeTimer.current);
      openedBy.current = by;
      onOpenChange(menu.id, true);
    },
    [onOpenChange, menu.id],
  );

  const hide = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    openedBy.current = null;
    onOpenChange(menu.id, false);
  }, [onOpenChange, menu.id]);

  // Closed from outside (another menu opened): forget how this one was opened.
  useEffect(() => {
    if (!open) openedBy.current = null;
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) hide();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const focusInside = wrapRef.current?.contains(document.activeElement);
      hide();
      if (focusInside) triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, hide]);

  const onTriggerClick = () => {
    if (!open) show("click");
    // A click on a hover-opened menu pins it open rather than closing it.
    else if (openedBy.current === "hover") openedBy.current = "click";
    else hide();
  };

  return (
    <li
      ref={wrapRef}
      className={`flex h-full items-center ${wide ? "" : "relative"}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && show(open && openedBy.current === "click" ? "click" : "hover")}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse" && openedBy.current === "hover") {
          closeTimer.current = window.setTimeout(hide, HOVER_CLOSE_MS);
        }
      }}
      onBlur={(e) => {
        // Focus moved somewhere outside the menu (null = clicked empty space; outside clicks are handled above).
        if (e.relatedTarget && !wrapRef.current?.contains(e.relatedTarget as Node)) hide();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onTriggerClick}
        className={`flex h-full items-center gap-1 text-body-sm transition-colors duration-base hover:text-ink ${open ? "text-ink" : "text-ink/70"}`}
      >
        {menu.label}
        <ChevronDown
          aria-hidden
          className={`size-3.5 transition-transform duration-base motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={id}
        className={`absolute top-full border-line bg-paper transition-[opacity,translate,visibility] duration-fast ease-out motion-reduce:transition-none ${
          wide ? "inset-x-0 border-b" : "left-1/2 w-80 -translate-x-1/2 border p-4"
        } ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
      >
        {wide ? (
          <div className="mx-auto grid max-w-content grid-cols-2 gap-10 px-gutter py-8 lg:grid-cols-[1fr_1fr_minmax(0,22rem)]">
            <MenuBody menu={menu} onNavigate={hide} />
          </div>
        ) : (
          <MenuBody menu={menu} onNavigate={hide} />
        )}
      </div>
    </li>
  );
}

/* ---------------------------------------------------------------- mobile */

/** Tap-to-expand section inside the mobile menu (no hover on touch). Expansion is owned by the Nav. */
export function MobileNavSection({
  menu,
  expanded,
  onToggle,
  onNavigate,
}: {
  menu: NavMenu;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const id = `mobile-${panelId(menu)}`;
  return (
    <li className="border-b border-line last:border-b-0">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3.5 text-body"
      >
        {menu.label}
        <ChevronDown
          aria-hidden
          className={`size-4 transition-transform duration-base motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div id={id} className="flex flex-col gap-6 pb-5">
          <MenuBody menu={menu} onNavigate={onNavigate} mobile />
        </div>
      )}
    </li>
  );
}
