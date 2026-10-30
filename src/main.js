// ページの動き：モバイルメニュー、よくある質問の開閉、スクロールで表示
document.addEventListener("DOMContentLoaded", () => {
  // モバイルメニュー
  document.querySelectorAll("[data-menu-root]").forEach((root) => {
    const toggle = root.querySelector("[data-menu-toggle]")
    const menu = root.querySelector("[data-menu]")
    if (!toggle || !menu) return

    const setOpen = (open) => {
      menu.classList.toggle("hidden", !open)
      toggle.setAttribute("aria-expanded", String(open))
      toggle.querySelector('[data-menu-icon="open"]')?.classList.toggle("hidden", open)
      toggle.querySelector('[data-menu-icon="close"]')?.classList.toggle("hidden", !open)
    }

    toggle.addEventListener("click", () => setOpen(menu.classList.contains("hidden")))
    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => setOpen(false)),
    )
  })

  // よくある質問（同時に開くのは1つだけ）
  document.querySelectorAll("[data-faq-group]").forEach((group) => {
    const items = [...group.querySelectorAll("[data-faq-item]")]

    const setOpen = (item, open) => {
      item.querySelector("[data-faq-answer]").classList.toggle("hidden", !open)
      item.querySelector("[data-faq-button]").setAttribute("aria-expanded", String(open))
      item.querySelector("[data-faq-indicator]")?.classList.toggle("rotate-45", open)
    }

    items.forEach((item) => {
      item.querySelector("[data-faq-button]").addEventListener("click", () => {
        const wasOpen = !item.querySelector("[data-faq-answer]").classList.contains("hidden")
        items.forEach((other) => setOpen(other, false))
        if (!wasOpen) setOpen(item, true)
      })
    })
  })

  // スクロールでふわっと表示（.reveal-group の子要素が対象）
  const targets = document.querySelectorAll("main section:not(#top) > .reveal-group > *")
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"))
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-visible")
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: "0px 0px -10% 0px" },
  )
  targets.forEach((el) => observer.observe(el))
})
