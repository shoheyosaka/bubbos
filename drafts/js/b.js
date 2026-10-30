// 案B「亜空間」の動き
// 星のワープ、スクロールで表示、右端の計器、メニュー、標本の拡大表示、ゲートと信号、断片（紙芝居）

const artworks = [
  { image: "assets/art-sun.jpg" },
  { image: "assets/art-portrait.jpg" },
  { image: "assets/art-cosmos.jpg" },
  { image: "assets/art-hills.jpg" },
  { image: "assets/art-flower.jpg" },
  { image: "assets/art-trees.jpg" },
  { image: "assets/art-stars.jpg" },
]

const attractionDetails = {
  laugh: { title: "ワライ屋", english: "LAUGH", lead: "笑いは、いちばん小さな革命。", description: "ギャグを続け、誰かを笑わせる遊び。固くなった空気に、ひとつの抜け道をつくります。", tags: ["ギャグ", "ひらめき", "笑う"] },
  friends: { title: "ナカマ屋", english: "CONNECT", lead: "面白い人は、面白い人を呼ぶ。", description: "面白い人や個性的な人たちをつなぐ活動。肩書きよりも、その人だけの色を目印にします。", tags: ["出会い", "個性", "つながる"] },
  heal: { title: "イヤシ屋", english: "HEAL", lead: "見えないものにも、耳をすます。", description: "気やエネルギーを通じた癒やしの活動。立ち止まり、自分の内側へ戻る時間をひらきます。", tags: ["気", "エネルギー", "整える"] },
  story: { title: "ハナシ屋", english: "STORY", lead: "一枚の絵から、世界が動きだす。", description: "絵と物語を使った紙芝居の制作や表現活動。色と言葉をめくりながら、まだない景色へ進みます。", tags: ["絵", "紙芝居", "物語る"] },
}

// 未知の信号を開いたときのひとこと（案A・最終案の doorWords と同じ）
const doorWords = [
  "迷子になるのも、ひとつの地図。",
  "ふざけることは、ほんとうは真剣だ。",
  "正しさより、おもしろさを信じてみる。",
  "空を見上げた瞬間、宇宙旅行はもう始まっている。",
  "遠回りした道ほど、景色を覚えている。",
  "失敗は、まだ名前のついていない発明。",
  "子どもの落書きに、世界の設計図がある。",
  "何もしない時間が、いちばん色を育てる。",
  "となりの人も、まだ見ぬ惑星。",
  "笑った回数だけ、地球は少し軽くなる。",
  "答えを急がない。問いのまま、遊んでおく。",
  "線をはみ出したところから、絵は生きはじめる。",
  "毎日は同じに見えて、同じ日は一度もない。",
  "心がほどけると、世界もほどける。",
]

const storyPages = [
  { kicker: "BASE SHOP WORDS / 01", title: "恋をもたらす女神花", text: "この花は、誰かを探しに行くための花ではありません。\n自分の中心に還ったとき、すでに始まっている恋に気づくための花です。", art: 0 },
  { kicker: "BASE SHOP WORDS / 02", title: "澄んだ目でみた山", text: "目が澄んだ瞬間、いつも汚れて見えていた山が、青く見えた。\n美しく愛してくれる世界は、ずっと変わっていなかった。", art: 1 },
  { kicker: "BASE SHOP WORDS / 03", title: "BUDDHA IN THE BODY", text: "幸せは分泌される。\n悟りもまた、現象として起こる。\nそれを、見ているものが在る。", art: 2 },
  { kicker: "BASE SHOP WORDS / 04", title: "After", text: "世界は、何も変わっていない。\n変わったのは、見ている位置だけだ。", art: 3 },
  { kicker: "BASE SHOP WORDS / 05", title: "グレートマザー", text: "ずっと、世界は与えていた。\n私が、受け取れていなかっただけだった。\n無限の豊かさはあなたのものです。", art: 4 },
  { kicker: "BASE SHOP WORDS / 06", title: "空から、花が降ってきた。", text: "ある日、空から、花が降ってきた。\n願いじゃなくて、祝福だった。", art: 5 },
  { kicker: "BASE SHOP WORDS / 07", title: "開合功", text: "開いたら、入ってきた。\n合わせたら、すでに満ちていた。", art: 6 },
]

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
const pad2 = (value) => String(value).padStart(2, "0")
const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])

const scrollLocks = new Set()
const setScrollLock = (key, locked) => {
  if (locked) scrollLocks.add(key)
  else scrollLocks.delete(key)
  document.body.style.overflow = scrollLocks.size ? "hidden" : ""
}

document.addEventListener("DOMContentLoaded", () => {
  initWarp()
  initReveal()
  initHud()
  initMenu()
  initModal()
  initReadout()
  initFragments()
})

// ---- 入口：星がこちらへ流れてくる（入口が見えている間だけ動かす） ----
function initWarp() {
  const canvas = document.querySelector("[data-warp]")
  if (!canvas) return
  const ctx = canvas.getContext("2d")
  const stars = []
  let width = 0
  let height = 0
  let frame = 0

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    width = canvas.clientWidth
    height = canvas.clientHeight
    canvas.width = width * ratio
    canvas.height = height * ratio
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  }
  const reset = (star) => {
    star.x = (Math.random() - 0.5) * 2
    star.y = (Math.random() - 0.5) * 2
    star.z = Math.random() * 0.9 + 0.1
    star.pz = star.z
    return star
  }
  const count = window.innerWidth < 640 ? 90 : 180
  for (let i = 0; i < count; i++) stars.push(reset({}))

  const draw = () => {
    ctx.clearRect(0, 0, width, height)
    const cx = width * 0.62
    const cy = height * 0.48
    const scale = Math.max(width, height) * 0.5
    stars.forEach((star, i) => {
      star.pz = star.z
      star.z -= 0.0035
      if (star.z <= 0.02) reset(star)
      const x = cx + (star.x / star.z) * scale
      const y = cy + (star.y / star.z) * scale
      const px = cx + (star.x / star.pz) * scale
      const py = cy + (star.y / star.pz) * scale
      const alpha = Math.min(1, (1 - star.z) * 1.4)
      ctx.strokeStyle = i % 5 === 0 ? `rgba(155,123,255,${alpha})` : `rgba(180,240,255,${alpha})`
      ctx.lineWidth = (1 - star.z) * 2
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(x, y)
      ctx.stroke()
    })
    frame = requestAnimationFrame(draw)
  }

  resize()
  window.addEventListener("resize", resize)
  if (reducedMotion.matches) {
    // 動きを減らす設定の人には、止まった星空だけ描く
    stars.forEach((star) => {
      ctx.fillStyle = "rgba(180,240,255,.6)"
      ctx.fillRect(width * 0.62 + (star.x / star.z) * width * 0.5, height * 0.48 + (star.y / star.z) * height * 0.5, 1.5, 1.5)
    })
    return
  }
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !frame) frame = requestAnimationFrame(draw)
    else if (!entry.isIntersecting) {
      cancelAnimationFrame(frame)
      frame = 0
    }
  }).observe(canvas)
}

// ---- スクロールで浮かび上がる ----
function initReveal() {
  const targets = document.querySelectorAll(".reveal")
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"))
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-in")
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: "0px 0px -12% 0px" },
  )
  targets.forEach((el) => observer.observe(el))
}

// ---- 右端の計器：いまのセクターとスクロール量 ----
function initHud() {
  const label = document.querySelector("[data-hud-sector]")
  const bar = document.querySelector("[data-hud-progress]")
  if (!label || !bar) return
  let ticking = false
  window.addEventListener("scroll", () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.style.height = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`
    })
  }, { passive: true })
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) label.textContent = `SECTOR ${entry.target.dataset.sector}`
      })
    },
    { rootMargin: "-45% 0px -45% 0px" },
  )
  document.querySelectorAll("[data-sector]").forEach((section) => observer.observe(section))
}

// ---- モバイルメニュー ----
function initMenu() {
  const menu = document.querySelector("[data-menu]")
  const openButton = document.querySelector("[data-menu-open]")
  if (!menu || !openButton) return
  const setOpen = (open) => {
    menu.hidden = !open
    openButton.setAttribute("aria-expanded", String(open))
    setScrollLock("menu", open)
    if (open) menu.querySelector("[data-menu-close]").focus()
  }
  openButton.addEventListener("click", () => setOpen(true))
  menu.querySelector("[data-menu-close]").addEventListener("click", () => {
    setOpen(false)
    openButton.focus()
  })
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)))
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) setOpen(false)
  })
}

// ---- 標本の拡大表示 ----
function initModal() {
  const modal = document.querySelector("[data-modal]")
  if (!modal) return
  const image = modal.querySelector("[data-modal-image]")
  const number = modal.querySelector("[data-modal-number]")
  const closeButton = modal.querySelector("[data-modal-close]")
  let returnFocus = null

  const close = () => {
    modal.hidden = true
    setScrollLock("modal", false)
    returnFocus?.focus()
  }
  document.querySelectorAll("[data-art]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.art)
      returnFocus = button
      image.src = artworks[index].image
      image.alt = `ブッボスの作品 ${pad2(index + 1)}`
      number.textContent = `SPEC-${pad2(index + 1)} / ARTWORK ${pad2(index + 1)}`
      modal.hidden = false
      setScrollLock("modal", true)
      closeButton.focus()
    })
  })
  closeButton.addEventListener("click", close)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close()
  })
}

// ---- ゲートと未知の信号：画面下の読み取り表示 ----
function initReadout() {
  const readout = document.querySelector("[data-readout]")
  const field = document.querySelector("[data-signal-field]")
  const gates = [...document.querySelectorAll("[data-gate]")]
  if (!readout) return
  let active = null

  // 信号を、重なりすぎないように格子の中へばらばらに置く
  if (field) {
    const cols = field.clientWidth < 600 ? 4 : 7
    const rows = Math.ceil(doorWords.length / cols)
    const cells = Array.from({ length: cols * rows }, (_, i) => i).sort(() => Math.random() - 0.5)
    doorWords.forEach((_, i) => {
      const cell = cells[i % cells.length]
      const x = ((cell % cols) + 0.2 + Math.random() * 0.6) / cols
      const y = (Math.floor(cell / cols) + 0.2 + Math.random() * 0.6) / rows
      const signal = document.createElement("button")
      signal.type = "button"
      signal.className = "signal"
      signal.dataset.signal = String(i)
      signal.setAttribute("aria-label", `未知の信号 ${pad2(i + 1)}`)
      signal.setAttribute("aria-expanded", "false")
      signal.style.left = `${(x * 100).toFixed(1)}%`
      signal.style.top = `${(y * 100).toFixed(1)}%`
      signal.style.setProperty("--delay", `${(Math.random() * 2.8).toFixed(2)}s`)
      field.append(signal)
    })
  }
  const signals = field ? [...field.querySelectorAll("[data-signal]")] : []

  const render = () => {
    readout.hidden = !active
    gates.forEach((gate) => {
      const open = active?.type === "gate" && active.id === gate.dataset.gate
      gate.classList.toggle("is-open", open)
      gate.setAttribute("aria-expanded", String(open))
    })
    signals.forEach((signal) => {
      const open = active?.type === "signal" && active.id === signal.dataset.signal
      signal.classList.toggle("is-open", open)
      signal.setAttribute("aria-expanded", String(open))
    })
    if (!active) return
    if (active.type === "gate") {
      const detail = attractionDetails[active.id]
      readout.innerHTML = `
        <button type="button" data-readout-close aria-label="閉じる">×</button>
        <p class="hud">GATE ${escapeHtml(detail.english)} / OPEN</p>
        <h3>${escapeHtml(detail.title)}</h3>
        <strong>${escapeHtml(detail.lead)}</strong>
        <p>${escapeHtml(detail.description)}</p>
        <div>${detail.tags.map((tag) => `<small>#${escapeHtml(tag)}</small>`).join("")}</div>`
    } else {
      const index = Number(active.id)
      readout.innerHTML = `
        <button type="button" data-readout-close aria-label="閉じる">×</button>
        <p class="hud">UNKNOWN SIGNAL ${pad2(index + 1)} / DECODED</p>
        <strong>${escapeHtml(doorWords[index])}</strong>`
    }
    readout.style.animation = "none"
    void readout.offsetWidth
    readout.style.animation = ""
  }
  const toggle = (type, id) => {
    active = active?.type === type && active.id === id ? null : { type, id }
    render()
  }

  gates.forEach((gate) => gate.addEventListener("click", () => toggle("gate", gate.dataset.gate)))
  signals.forEach((signal) => signal.addEventListener("click", () => toggle("signal", signal.dataset.signal)))
  readout.addEventListener("click", (event) => {
    if (event.target.closest("[data-readout-close]")) {
      active = null
      render()
    }
  })
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && active) {
      active = null
      render()
    }
  })
  // ゲートのセクターから離れたら閉じる
  const section = document.querySelector("#attractions")
  if (section && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && active) {
        active = null
        render()
      }
    }).observe(section)
  }
}

// ---- 断片（紙芝居）：横に流れるカード ----
function initFragments() {
  const track = document.querySelector("[data-frag-track]")
  if (!track) return
  const current = document.querySelector("[data-frag-current]")
  document.querySelector("[data-frag-total]").textContent = pad2(storyPages.length)

  track.innerHTML = storyPages
    .map(
      (story) => `
      <article class="frag">
        <img src="${artworks[story.art].image}" alt="ブッボスの作品「${escapeHtml(story.title)}」" loading="lazy">
        <div>
          <span>${escapeHtml(story.kicker)}</span>
          <h3>${escapeHtml(story.title)}</h3>
          <p>${escapeHtml(story.text)}</p>
        </div>
      </article>`,
    )
    .join("")
  const frags = [...track.children]

  const currentIndex = () => {
    const left = track.getBoundingClientRect().left
    let best = 0
    frags.forEach((frag, i) => {
      if (Math.abs(frag.getBoundingClientRect().left - left) < Math.abs(frags[best].getBoundingClientRect().left - left)) best = i
    })
    return best
  }
  const go = (delta) => {
    const next = Math.min(Math.max(currentIndex() + delta, 0), frags.length - 1)
    track.scrollTo({ left: frags[next].offsetLeft - frags[0].offsetLeft, behavior: reducedMotion.matches ? "auto" : "smooth" })
  }

  let ticking = false
  track.addEventListener("scroll", () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      current.textContent = pad2(currentIndex() + 1)
    })
  }, { passive: true })
  document.querySelector("[data-frag-prev]").addEventListener("click", () => go(-1))
  document.querySelector("[data-frag-next]").addEventListener("click", () => go(1))
  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") go(-1)
    else if (event.key === "ArrowRight") go(1)
    else return
    event.preventDefault()
  })
}
