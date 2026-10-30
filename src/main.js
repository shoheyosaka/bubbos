// ブッボス：ページの動き
// メニュー、ヒーローの視差、文字の集合、3Dリングギャラリー、活動の扉、紙芝居、作品の拡大表示

// 作品（ギャラリーのリングと同じ順番）
const artworks = [
  { id: 1, image: "assets/art-sun.jpg", bg: "#174A98" },
  { id: 2, image: "assets/art-portrait.jpg", bg: "#E7DFCA" },
  { id: 3, image: "assets/art-cosmos.jpg", bg: "#E25437" },
  { id: 4, image: "assets/art-hills.jpg", bg: "#173D34" },
  { id: 5, image: "assets/art-flower.jpg", bg: "#F0C83B" },
  { id: 6, image: "assets/art-trees.jpg", bg: "#A84C38" },
  { id: 7, image: "assets/art-stars.jpg", bg: "#D8B56E" },
]

// 活動の扉（キーは index.html の data-door）
const attractionDetails = {
  laugh: {
    title: "ワライ屋",
    english: "LAUGH",
    lead: "笑いは、いちばん小さな革命。",
    description: "ギャグを続け、誰かを笑わせる遊び。固くなった空気に、ひとつの抜け道をつくります。",
    tags: ["ギャグ", "ひらめき", "笑う"],
  },
  friends: {
    title: "ナカマ屋",
    english: "CONNECT",
    lead: "面白い人は、面白い人を呼ぶ。",
    description: "面白い人や個性的な人たちをつなぐ活動。肩書きよりも、その人だけの色を目印にします。",
    tags: ["出会い", "個性", "つながる"],
  },
  heal: {
    title: "イヤシ屋",
    english: "HEAL",
    lead: "見えないものにも、耳をすます。",
    description: "気やエネルギーを通じた癒やしの活動。立ち止まり、自分の内側へ戻る時間をひらきます。",
    tags: ["気", "エネルギー", "整える"],
  },
  story: {
    title: "ハナシ屋",
    english: "STORY",
    lead: "一枚の絵から、世界が動きだす。",
    description: "絵と物語を使った紙芝居の制作や表現活動。色と言葉をめくりながら、まだない景色へ進みます。",
    tags: ["絵", "紙芝居", "物語る"],
  },
}

// 名前のない扉を開いたときのひとこと（キーは index.html の data-door）
const doorWords = {
  "dummy-a": "迷子になるのも、ひとつの地図。",
  "dummy-b": "ふざけることは、ほんとうは真剣だ。",
  "dummy-c": "正しさより、おもしろさを信じてみる。",
  "dummy-d": "空を見上げた瞬間、宇宙旅行はもう始まっている。",
  "dummy-e": "遠回りした道ほど、景色を覚えている。",
  "dummy-f": "失敗は、まだ名前のついていない発明。",
  "dummy-g": "子どもの落書きに、世界の設計図がある。",
  "dummy-h": "何もしない時間が、いちばん色を育てる。",
  "dummy-i": "となりの人も、まだ見ぬ惑星。",
  "dummy-j": "笑った回数だけ、地球は少し軽くなる。",
  "dummy-k": "答えを急がない。問いのまま、遊んでおく。",
  "dummy-l": "線をはみ出したところから、絵は生きはじめる。",
  "dummy-m": "毎日は同じに見えて、同じ日は一度もない。",
  "dummy-n": "心がほどけると、世界もほどける。",
}

// 紙芝居
const storyPages = [
  {
    kicker: "BASE SHOP WORDS / 01",
    title: "恋をもたらす女神花",
    text: "この花は、誰かを探しに行くための花ではありません。\n自分の中心に還ったとき、すでに始まっている恋に気づくための花です。",
    art: 0,
  },
  {
    kicker: "BASE SHOP WORDS / 02",
    title: "澄んだ目でみた山",
    text: "目が澄んだ瞬間、いつも汚れて見えていた山が、青く見えた。\n美しく愛してくれる世界は、ずっと変わっていなかった。",
    art: 1,
  },
  {
    kicker: "BASE SHOP WORDS / 03",
    title: "BUDDHA IN THE BODY",
    text: "幸せは分泌される。\n悟りもまた、現象として起こる。\nそれを、見ているものが在る。",
    art: 2,
  },
  {
    kicker: "BASE SHOP WORDS / 04",
    title: "After",
    text: "世界は、何も変わっていない。\n変わったのは、見ている位置だけだ。",
    art: 3,
  },
  {
    kicker: "BASE SHOP WORDS / 05",
    title: "グレートマザー",
    text: "ずっと、世界は与えていた。\n私が、受け取れていなかっただけだった。\n無限の豊かさはあなたのものです。",
    art: 4,
  },
  {
    kicker: "BASE SHOP WORDS / 06",
    title: "空から、花が降ってきた。",
    text: "ある日、空から、花が降ってきた。\n願いじゃなくて、祝福だった。",
    art: 5,
  },
  {
    kicker: "BASE SHOP WORDS / 07",
    title: "開合功",
    text: "開いたら、入ってきた。\n合わせたら、すでに満ちていた。",
    art: 6,
  },
]

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
const pad2 = (value) => String(value).padStart(2, "0")
const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])

// メニューやモーダルを開いている間は、後ろのページをスクロールさせない
const scrollLocks = new Set()
const setScrollLock = (key, locked) => {
  if (locked) scrollLocks.add(key)
  else scrollLocks.delete(key)
  document.body.style.overflow = scrollLocks.size ? "hidden" : ""
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu()
  initHero()
  initScatter()
  const modal = initArtModal()
  initRing(modal)
  initDoors()
  initStory()
})

// ---- モバイルメニュー ----
function initMenu() {
  const menu = document.querySelector("[data-menu]")
  const openButton = document.querySelector("[data-menu-open]")
  if (!menu || !openButton) return

  const setOpen = (open) => {
    menu.hidden = !open
    openButton.setAttribute("aria-expanded", String(open))
    setScrollLock("menu", open)
    if (open) menu.querySelector("[data-menu-close]")?.focus()
  }

  openButton.addEventListener("click", () => setOpen(true))
  menu.querySelector("[data-menu-close]")?.addEventListener("click", () => {
    setOpen(false)
    openButton.focus()
  })
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)))
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) setOpen(false)
  })
}

// ---- ヒーロー：マウスに合わせて少し動く。画面外ではアニメーションを止める ----
function initHero() {
  const hero = document.querySelector("[data-hero]")
  if (!hero) return

  if (window.matchMedia("(pointer: fine)").matches && !reducedMotion.matches) {
    let frame = 0
    hero.addEventListener("pointermove", (event) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        hero.style.setProperty("--jungle-x", ((event.clientX / window.innerWidth - 0.5) * 2).toFixed(3))
        hero.style.setProperty("--jungle-y", ((event.clientY / window.innerHeight - 0.5) * 2).toFixed(3))
      })
    })
  }

  if (!("IntersectionObserver" in window)) {
    hero.classList.add("is-active")
    return
  }
  new IntersectionObserver(([entry]) => hero.classList.toggle("is-active", entry.isIntersecting), {
    threshold: 0.04,
  }).observe(hero)
}

// ---- 文字がばらばらの位置から集まってくる ----
function initScatter() {
  const directions = [
    ["-90px", "-55px", "-18deg"],
    ["75px", "-80px", "14deg"],
    ["110px", "20px", "24deg"],
    ["-105px", "45px", "-25deg"],
    ["20px", "100px", "12deg"],
    ["-35px", "-110px", "-10deg"],
    ["90px", "85px", "20deg"],
    ["-80px", "90px", "-16deg"],
  ]

  document.querySelectorAll("[data-scatter]").forEach((el) => {
    const text = el.textContent.trim()
    const characters = Array.from(text)
    el.setAttribute("aria-label", text)
    el.textContent = ""
    characters.forEach((character, index) => {
      const [x, y, r] = directions[(index * 5 + characters.length) % directions.length]
      const span = document.createElement("span")
      span.setAttribute("aria-hidden", "true")
      if (character === " ") span.className = "scatter-space"
      span.style.setProperty("--scatter-x", x)
      span.style.setProperty("--scatter-y", y)
      span.style.setProperty("--scatter-r", r)
      span.style.setProperty("--scatter-delay", `${((index * 7) % 13) * 0.045}s`)
      span.textContent = character === " " ? " " : character
      el.append(span)
    })
  })

  document.querySelectorAll("[data-scatter-group]").forEach((group) => {
    if (!("IntersectionObserver" in window)) {
      group.classList.add("is-visible")
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        group.classList.add("is-visible")
        observer.disconnect()
      },
      { threshold: 0.35 },
    )
    observer.observe(group)
  })
}

// ---- 作品の拡大表示 ----
function initArtModal() {
  const modal = document.querySelector("[data-art-modal]")
  if (!modal) return { open() {} }
  const visual = modal.querySelector("[data-art-modal-visual]")
  const image = modal.querySelector("[data-art-modal-image]")
  const number = modal.querySelector("[data-art-modal-number]")
  const closeButton = modal.querySelector("[data-art-modal-close]")
  let returnFocus = null

  const close = () => {
    modal.hidden = true
    setScrollLock("modal", false)
    returnFocus?.focus()
  }

  closeButton.addEventListener("click", close)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close()
  })

  return {
    open(index) {
      const art = artworks[index]
      if (!art) return
      returnFocus = document.activeElement
      visual.style.background = art.bg
      image.src = art.image
      number.textContent = `ARTWORK ${pad2(art.id)}`
      modal.hidden = false
      setScrollLock("modal", true)
      closeButton.focus()
    },
  }
}

// ---- 3Dリングギャラリー ----
function initRing(modal) {
  const root = document.querySelector("[data-ring]")
  if (!root) return
  const cards = [...root.querySelectorAll("[data-ring-card]")]
  const count = cards.length
  if (!count) return

  const step = 360 / count
  const speed = 6 // 自動回転（度/秒）
  const dragSensitivity = 0.25 // 1px ドラッグで回る角度
  const friction = 0.95 // 手を離したあとの減速
  const resumeDelay = 2500 // 操作後、自動回転に戻るまで（ミリ秒）

  let angle = 0
  let velocity = 0
  let target = null
  let front = -1
  let hovering = false
  let idleUntil = 0
  let drag = null
  let ignoreClickUntil = 0
  let frame = 0
  let last = 0

  const frontIndex = () => (((Math.round(-angle / step) % count) + count) % count)

  const render = () => {
    const radius = getComputedStyle(root).getPropertyValue("--ring-radius").trim() || "390px"
    cards.forEach((card, i) => {
      const a = i * step + angle
      const cos = Math.cos((a * Math.PI) / 180)
      const facing = (cos + 1) / 2
      card.style.transform = `rotateY(${a}deg) translateZ(${radius})`
      // 向こうを向いたカードは裏面を見せる（backface-visibility は button 内で効かないため）
      card.classList.toggle("is-back", cos < -0.05)
      // opacity をカード自体に付けると立体が平たくなるので、表と裏に渡す
      card.style.setProperty("--ring-fade", (0.35 + facing * 0.65).toFixed(3))
      card.style.zIndex = String(Math.round(facing * 100))
    })
    const next = frontIndex()
    if (next !== front) {
      front = next
      cards.forEach((card, i) => {
        card.classList.toggle("is-front", i === front)
        card.tabIndex = i === front ? 0 : -1
      })
    }
  }

  const tick = (now) => {
    const dt = last ? Math.min(now - last, 64) / 1000 : 0
    last = now
    if (!drag) {
      if (Math.abs(velocity) > 0.02) {
        angle += velocity
        velocity *= friction
      } else {
        velocity = 0
        const autoRotate = !reducedMotion.matches && !hovering && now > idleUntil && target === null
        if (autoRotate) angle -= speed * dt
        else {
          // 一番近い作品か、指定された作品の位置で止める
          const goal = target ?? Math.round(angle / step) * step
          angle += (goal - angle) * 0.12
          if (Math.abs(goal - angle) < 0.05) {
            angle = goal
            target = null
          }
        }
      }
    }
    render()
    frame = requestAnimationFrame(tick)
  }

  const start = () => {
    if (!frame) {
      last = 0
      frame = requestAnimationFrame(tick)
    }
  }
  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
  }

  const goTo = (index) => {
    const wanted = -index * step
    // 今の角度から一番近い向きで回る
    target = wanted + Math.round((angle - wanted) / 360) * 360
    velocity = 0
    idleUntil = performance.now() + resumeDelay
  }

  root.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") hovering = true
  })
  root.addEventListener("pointerleave", () => {
    hovering = false
  })

  root.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return
    drag = { id: event.pointerId, startX: event.clientX, lastX: event.clientX, moved: false }
    velocity = 0
    target = null
  })
  root.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return
    const dx = event.clientX - drag.lastX
    drag.lastX = event.clientX
    if (!drag.moved && Math.abs(event.clientX - drag.startX) > 6) {
      drag.moved = true
      root.setPointerCapture(event.pointerId)
      root.classList.add("is-dragging")
    }
    if (drag.moved) {
      angle += dx * dragSensitivity
      velocity = velocity * 0.5 + dx * dragSensitivity * 0.5
    }
  })
  const endDrag = (event) => {
    if (!drag || drag.id !== event.pointerId) return
    // ドラッグの直後に起きるクリックで作品が開かないようにする
    if (drag.moved) ignoreClickUntil = performance.now() + 80
    drag = null
    root.classList.remove("is-dragging")
    idleUntil = performance.now() + resumeDelay
  }
  root.addEventListener("pointerup", endDrag)
  root.addEventListener("pointercancel", endDrag)

  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      if (performance.now() < ignoreClickUntil) return
      if (i === front) modal.open(i)
      else goTo(i)
    })
  })

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") goTo((front - 1 + count) % count)
    else if (event.key === "ArrowRight") goTo((front + 1) % count)
    else return
    event.preventDefault()
  })

  document.querySelector("[data-ring-open]")?.addEventListener("click", () => modal.open(front))

  render()
  // 画面に見えている間だけ動かす
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop())).observe(root)
  } else start()
}

// ---- 活動の扉 ----
function initDoors() {
  const field = document.querySelector("[data-door-field]")
  const panel = document.querySelector("[data-door-panel]")
  if (!field || !panel) return
  const cards = [...field.querySelectorAll(".door-card")]
  let openId = null
  // セクションの中だと画面に固定できない（content-visibility のため）ので body の直下へ移す
  document.body.append(panel)

  // 読み込むたびに並び順・傾き・高さをばらばらにする
  const random = (min, max) => min + Math.random() * (max - min)
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  cards.forEach((card) => {
    card.style.setProperty("--tilt", `${random(-5, 5).toFixed(1)}deg`)
    card.style.setProperty("--lift", `${Math.round(random(0, 70))}px`)
    field.append(card)
  })

  const renderPanel = () => {
    panel.hidden = !openId
    if (!openId) return
    const detail = attractionDetails[openId]
    panel.innerHTML = `
      <button type="button" data-door-close aria-label="説明を閉じる">×</button>
      ${
        detail
          ? `<span>${escapeHtml(detail.english)} / OPEN</span>
             <h3>${escapeHtml(detail.title)}</h3>
             <strong>${escapeHtml(detail.lead)}</strong>
             <p>${escapeHtml(detail.description)}</p>
             <div>${detail.tags.map((tag) => `<small>#${escapeHtml(tag)}</small>`).join("")}</div>`
          : `<span>UNKNOWN DOOR / OPEN</span>
             <h3>名前のない扉</h3>
             <strong>${escapeHtml(doorWords[openId] ?? "この扉の向こうは、まだひみつ。")}</strong>`
      }`
    // 開くたびに飛び出すアニメーションをやり直す
    panel.style.animation = "none"
    void panel.offsetWidth
    panel.style.animation = ""
  }

  const setOpen = (id) => {
    openId = id
    cards.forEach((card) => {
      const door = card.querySelector("[data-door]")
      const isOpen = door.dataset.door === id
      card.classList.toggle("is-open", isOpen)
      door.setAttribute("aria-expanded", String(isOpen))
    })
    renderPanel()
  }

  field.addEventListener("click", (event) => {
    const door = event.target.closest("[data-door]")
    if (door) setOpen(openId === door.dataset.door ? null : door.dataset.door)
  })
  panel.addEventListener("click", (event) => {
    if (event.target.closest("[data-door-close]")) setOpen(null)
  })
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && openId) setOpen(null)
  })
  // 扉の並びが画面から外れたら閉じる
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && openId) setOpen(null)
    }).observe(field)
  }
}

// ---- 紙芝居 ----
function initStory() {
  const section = document.querySelector("[data-story]")
  if (!section) return
  const page = section.querySelector("[data-story-page]")
  const current = section.querySelector("[data-story-current]")
  section.querySelector("[data-story-total]").textContent = pad2(storyPages.length)
  let index = 0
  let touchStart = null

  const render = () => {
    const story = storyPages[index]
    const art = artworks[story.art]
    page.innerHTML = `
      <div class="art-visual photo-art" style="background: ${art.bg}">
        <img src="${art.image}" alt="ブッボスによる、花や星が鮮やかな色と力強い線で描かれた作品">
        <span class="placeholder-label">ARTWORK DETAIL</span>
      </div>
      <div class="story-caption">
        <span>${escapeHtml(story.kicker)}</span>
        <h3>${escapeHtml(story.title)}</h3>
        <p>${escapeHtml(story.text)}</p>
        <i class="story-spark">✦</i>
        <small>${pad2(index + 1)} / ${pad2(storyPages.length)}</small>
      </div>`
    current.textContent = pad2(index + 1)
    // めくるアニメーションをやり直す
    page.style.animation = "none"
    void page.offsetWidth
    page.style.animation = ""
  }

  const go = (delta) => {
    index = (index + delta + storyPages.length) % storyPages.length
    render()
  }

  section.querySelector("[data-story-prev]").addEventListener("click", () => go(-1))
  section.querySelector("[data-story-next]").addEventListener("click", () => go(1))
  section.addEventListener("touchstart", (event) => {
    touchStart = event.touches[0].clientX
  }, { passive: true })
  section.addEventListener("touchend", (event) => {
    if (touchStart === null) return
    const distance = event.changedTouches[0].clientX - touchStart
    if (Math.abs(distance) > 45) go(distance > 0 ? -1 : 1)
    touchStart = null
  })
}
