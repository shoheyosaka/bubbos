// ブッボス：ページの動き
// メニュー、ヒーローの視差、文字の集合、3Dリングギャラリー、活動の光の扉、紙芝居、作品の拡大表示
// 調整案で追加：星のワープ、COSMOS の言葉の宇宙、スクロールで浮かび上がる表示、右端の計器

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

// 遠くの扉を開いたときのひとこと（遠くの扉はこの数だけ置かれる）
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

// COSMOS の宇宙空間に浮かぶ言葉（スマホでは先頭の24個だけ出る）
const cosmosWords = [
  "ただ、在る", "空", "観ている者は誰か", "すべては、ひとつ", "答えは、問いの中に", "無常",
  "いま、ここ", "境界は、心がつくる", "色即是空", "すでに、着いている", "ONENESS", "沈黙は、語る",
  "探すのをやめたとき", "縁起", "見えないものほど、確か", "名前より先に、存在がある", "光は、闇を知っている", "BE HERE NOW",
  "ひとつぶの星に、全宇宙", "生かされている", "宇宙が、わたしを見ている", "足りないものは、なにもない", "魂の記憶", "ゆるすと、ほどける",
  "空即是色", "時間は、円を描く", "意味は、あとからやってくる", "わたしは、風景の一部", "生まれる前の静けさ", "AWARENESS",
  "終わりは、はじまりの裏側", "受け取るだけでいい", "一即多", "満ちている", "ALL IS ONE", "観る",
]

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
  initWarp()
  initCosmos()
  initPhilosophy()
  initReveal()
  initGauge()
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

// ---- 活動：闇に浮かぶ光の扉。手前の4つは活動の説明、地平線の遠くの扉はひとこと ----
function initDoors() {
  const note = document.querySelector("[data-door-note]")
  const farWrap = document.querySelector("[data-far-doors]")
  const nearDoors = [...document.querySelectorAll(".light-door[data-door]")]
  if (!note) return
  const words = Object.values(doorWords)
  const glow = ["#ffcf4a", "#5ec8ff", "#7dffb0", "#ff7eb6", "#efc538", "#b79bff", "#e66138"]
  const random = (min, max) => min + Math.random() * (max - min)
  let active = null
  // セクションの中だと画面に固定できない（content-visibility のため）ので body の直下へ移す
  document.body.append(note)

  // 遠くの扉を地平線に並べる
  const jitter = words.map(() => random(-0.3, 0.3))
  const farDoors = words.map((_, i) => {
    const door = document.createElement("button")
    const width = random(16, 32)
    door.type = "button"
    door.className = "far-door"
    door.dataset.far = String(i)
    door.setAttribute("aria-label", `遠くの扉 ${pad2(i + 1)} を開く`)
    door.setAttribute("aria-expanded", "false")
    door.style.setProperty("--w", `${width.toFixed(0)}px`)
    door.style.setProperty("--blur", `${((32 - width) / 16).toFixed(2)}px`)
    door.style.setProperty("--c", glow[i % glow.length])
    farWrap?.append(door)
    return door
  })

  // 手前の扉の後ろに隠れて押せなくならないよう、地平線のあいている所にだけ均等に置く
  const placeFarDoors = () => {
    if (!farWrap) return
    const box = farWrap.getBoundingClientRect()
    if (!box.width) return
    const horizon = box.top + box.height * (window.innerWidth <= 640 ? 0.2 : 0.58)
    const blocked = nearDoors
      .map((door) => door.getBoundingClientRect())
      .filter((rect) => rect.top < horizon && rect.bottom > horizon - 60)
      .map((rect) => [rect.left - box.left - 24, rect.right - box.left + 24])
      .sort((a, b) => a[0] - b[0])
    const free = []
    let start = box.width * 0.03
    blocked.forEach(([from, to]) => {
      if (from > start) free.push([start, from])
      start = Math.max(start, to)
    })
    if (box.width * 0.97 > start) free.push([start, box.width * 0.97])
    const total = free.reduce((sum, [from, to]) => sum + (to - from), 0)
    const step = total / farDoors.length
    farDoors.forEach((door, i) => {
      // あいている所をつなげた長さの上で均等に並べ、元の位置に戻す
      let along = step * (i + 0.5 + jitter[i])
      const range = free.find(([from, to]) => {
        if (along <= to - from) return true
        along -= to - from
        return false
      }) ?? free[free.length - 1]
      door.style.setProperty("--x", `${(((range[0] + along) / box.width) * 100).toFixed(2)}%`)
    })
  }
  placeFarDoors()
  window.addEventListener("resize", placeFarDoors)

  const render = () => {
    note.hidden = !active
    nearDoors.forEach((door) => {
      const open = active?.type === "near" && active.id === door.dataset.door
      door.classList.toggle("is-open", open)
      door.setAttribute("aria-expanded", String(open))
    })
    farDoors.forEach((door) => {
      const open = active?.type === "far" && active.id === door.dataset.far
      door.classList.toggle("is-open", open)
      door.setAttribute("aria-expanded", String(open))
    })
    if (!active) return
    if (active.type === "near") {
      const detail = attractionDetails[active.id]
      const door = nearDoors.find((d) => d.dataset.door === active.id)
      note.style.setProperty("--c", door.style.getPropertyValue("--c"))
      note.innerHTML = `
        <button type="button" data-note-close aria-label="閉じる">×</button>
        <span>DOOR ${pad2(nearDoors.indexOf(door) + 1)} / ${escapeHtml(detail.english)}</span>
        <h3>${escapeHtml(detail.title)}</h3>
        <strong>${escapeHtml(detail.lead)}</strong>
        <p>${escapeHtml(detail.description)}</p>
        <div>${detail.tags.map((tag) => `<small>#${escapeHtml(tag)}</small>`).join("")}</div>`
    } else {
      const index = Number(active.id)
      note.style.setProperty("--c", farDoors[index].style.getPropertyValue("--c"))
      note.innerHTML = `
        <button type="button" data-note-close aria-label="閉じる">×</button>
        <span>UNKNOWN DOOR ${pad2(index + 1)}</span>
        <strong>${escapeHtml(words[index])}</strong>`
    }
    // 開くたびに出てくるアニメーションをやり直す
    note.style.animation = "none"
    void note.offsetWidth
    note.style.animation = ""
  }
  const close = () => {
    active = null
    render()
  }
  const toggle = (type, id) => {
    active = active?.type === type && active.id === id ? null : { type, id }
    render()
  }

  nearDoors.forEach((door) => door.addEventListener("click", () => toggle("near", door.dataset.door)))
  farDoors.forEach((door) => door.addEventListener("click", () => toggle("far", door.dataset.far)))
  note.addEventListener("click", (event) => {
    if (event.target.closest("[data-note-close]")) close()
  })
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && active) close()
  })
  // 活動のセクションから離れたら閉じる
  const section = document.querySelector("#attractions")
  if (section && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && active) close()
    }).observe(section)
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

// ---- 入口：星がこちらへ流れてくる（入口が見えている間だけ動かす） ----
function initWarp() {
  const canvas = document.querySelector("[data-warp]")
  if (!canvas || reducedMotion.matches || !("IntersectionObserver" in window)) return
  const ctx = canvas.getContext("2d")
  const colors = ["250,245,232", "239,197,56", "230,97,56"] // 生成り・黄・橙
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
    star.color = colors[Math.random() < 0.7 ? 0 : Math.random() < 0.6 ? 1 : 2]
    return star
  }
  const count = window.innerWidth < 640 ? 70 : 140
  for (let i = 0; i < count; i++) stars.push(reset({}))

  const draw = () => {
    ctx.clearRect(0, 0, width, height)
    const cx = width * 0.65
    const cy = height * 0.45
    const scale = Math.max(width, height) * 0.5
    stars.forEach((star) => {
      const pz = star.z
      star.z -= 0.003
      if (star.z <= 0.02) reset(star)
      const alpha = Math.min(1, (1 - star.z) * 1.5)
      ctx.strokeStyle = `rgba(${star.color},${alpha})`
      ctx.lineWidth = (1 - star.z) * 2.8
      ctx.beginPath()
      ctx.moveTo(cx + (star.x / pz) * scale, cy + (star.y / pz) * scale)
      ctx.lineTo(cx + (star.x / star.z) * scale, cy + (star.y / star.z) * scale)
      ctx.stroke()
    })
    frame = requestAnimationFrame(draw)
  }

  resize()
  window.addEventListener("resize", resize)
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !frame) frame = requestAnimationFrame(draw)
    else if (!entry.isIntersecting) {
      cancelAnimationFrame(frame)
      frame = 0
    }
  }).observe(canvas)
}

// ---- スクロールで、ぼかしから浮かび上がる ----
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

// ---- 右端の計器：いまのセクション番号とスクロール量 ----
function initGauge() {
  const label = document.querySelector("[data-gauge-label]")
  const bar = document.querySelector("[data-gauge-bar]")
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
  if (!("IntersectionObserver" in window)) return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) label.textContent = entry.target.dataset.gauge
      })
    },
    { rootMargin: "-45% 0px -45% 0px" },
  )
  document.querySelectorAll("[data-gauge]").forEach((section) => observer.observe(section))
}

// ---- COSMOS：宇宙空間に言葉が浮かび、スクロールで奥へ進む ----
function initCosmos() {
  const space = document.querySelector("[data-cosmos]")
  if (!space) return
  const field = space.querySelector("[data-cosmos-field]")
  const ring = space.querySelector("[data-cosmos-ring]")
  const depthLabel = space.querySelector("[data-cosmos-depth]")
  const random = (min, max) => min + Math.random() * (max - min)
  const palette = [
    ["#faf5e8", "rgba(250,245,232,.55)"],
    ["#faf5e8", "rgba(140,190,255,.6)"],
    ["#efc538", "rgba(239,197,56,.7)"],
    ["#e66138", "rgba(230,97,56,.7)"],
    ["#9fd0ff", "rgba(120,170,255,.7)"],
  ]
  const travel = 2600 // スクロールし切ったときに進む奥行き（px）

  // 言葉を奥行きのある空間にばらまく（真ん中の見出しの前は空けておく）
  const count = window.innerWidth < 640 ? 24 : cosmosWords.length
  const words = cosmosWords.slice(0, count).map((text, i) => {
    const el = document.createElement("span")
    const [color, glow] = palette[i % palette.length]
    const z = -travel - 400 + (i / count) * (travel + 500) + random(-120, 120)
    // 長いことばほど、画面の端で切れないよう内側に置く
    const reach = Math.max(20, 46 - text.length * 1.6)
    const x = random(-reach, reach)
    let y = random(-42, 42)
    // 見出しのまわり（横 ±34vw・縦 ±16vh）には置かない
    if (Math.abs(x) < 34 && Math.abs(y) < 16) y = (y < 0 ? -1 : 1) * random(18, 42)
    el.className = `cosmos-word${/^[A-Z ]+$/.test(text) ? " is-latin" : ""}`
    el.style.setProperty("--x", `${x.toFixed(1)}vw`)
    el.style.setProperty("--y", `${y.toFixed(1)}vh`)
    el.style.setProperty("--z", `${Math.round(z)}px`)
    el.style.setProperty("--size", `${random(1.2, text.length <= 2 ? 3.6 : 2.4).toFixed(2)}rem`)
    el.style.setProperty("--c", color)
    el.style.setProperty("--glow", glow)
    el.style.setProperty("--dx", `${random(-30, 30).toFixed(0)}px`)
    el.style.setProperty("--dy", `${random(-24, 24).toFixed(0)}px`)
    el.style.setProperty("--dr", `${random(-8, 8).toFixed(1)}deg`)
    el.style.setProperty("--dur", `${random(5, 11).toFixed(1)}s`)
    el.style.setProperty("--delay", `${random(-10, 0).toFixed(1)}s`)
    const inner = document.createElement("b")
    inner.textContent = text
    el.append(inner)
    field.append(el)
    return { el, z }
  })

  // 軌道リング：1文字ずつ円周に並べる
  const ringText = Array.from(ring.textContent.trim())
  ring.textContent = ""
  ringText.forEach((character, i) => {
    const span = document.createElement("span")
    span.textContent = character
    span.style.setProperty("--a", `${(360 / ringText.length) * i}deg`)
    ring.append(span)
  })

  // 進んだ距離に合わせて、手前を通り過ぎた言葉は消し、遠すぎる言葉は薄くする
  const update = () => {
    const rect = space.getBoundingClientRect()
    const range = rect.height - window.innerHeight
    const progress = reducedMotion.matches || range <= 0 ? 0 : Math.min(Math.max(-rect.top / range, 0), 1)
    const fly = progress * travel
    field.style.setProperty("--fly", `${fly.toFixed(0)}px`)
    words.forEach(({ el, z }) => {
      const depth = z + fly
      let opacity = 1
      if (depth > 650) opacity = 0
      else if (depth > 350) opacity = (650 - depth) / 300
      else if (depth < -2200) opacity = 0.12
      else if (depth < -1200) opacity = 0.12 + ((depth + 2200) / 1000) * 0.88
      el.style.opacity = opacity.toFixed(2)
    })
    if (depthLabel) depthLabel.textContent = Math.round(progress * 9999).toLocaleString("en-US")
  }

  let ticking = false
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      update()
    })
  }
  update()

  // マウスに合わせて空間を少し傾ける
  if (window.matchMedia("(pointer: fine)").matches && !reducedMotion.matches) {
    space.addEventListener("pointermove", (event) => {
      field.style.setProperty("--tilt-x", `${((event.clientX / window.innerWidth - 0.5) * 10).toFixed(2)}deg`)
      field.style.setProperty("--tilt-y", `${((event.clientY / window.innerHeight - 0.5) * -8).toFixed(2)}deg`)
    })
  }

  // 見えている間だけ、スクロールの計算とアニメーションを動かす
  if (!("IntersectionObserver" in window)) {
    space.classList.add("is-active")
    window.addEventListener("scroll", onScroll, { passive: true })
    return
  }
  new IntersectionObserver(([entry]) => {
    space.classList.toggle("is-active", entry.isIntersecting)
    if (entry.isIntersecting) window.addEventListener("scroll", onScroll, { passive: true })
    else window.removeEventListener("scroll", onScroll)
  }).observe(space)
}

// ---- 考え方：見出しの文字に触れて遊べる。近づくと逃げてバネで戻り、押すと跳ねて色が変わる ----
function initPhilosophy() {
  const section = document.querySelector("[data-philo]")
  const title = section?.querySelector("[data-kinetic]")
  if (!section || !title) return
  const colors = ["#efc538", "#e66138", "#5ec8ff", "#7dffb0", "#ff7eb6", "#faf5e8"]

  // 1文字ずつに分ける（読み上げは h2 の aria-label で行う）
  const chars = []
  title.querySelectorAll(".k-line").forEach((line) => {
    const text = Array.from(line.textContent.trim())
    line.textContent = ""
    text.forEach((character) => {
      const span = document.createElement("span")
      span.className = "k-char"
      span.setAttribute("aria-hidden", "true")
      span.textContent = character
      line.append(span)
      chars.push({ el: span, x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, color: 0 })
    })
  })

  // 押すと跳ねて、色が順番に変わる
  chars.forEach((char) => {
    char.el.addEventListener("click", () => {
      char.color = (char.color + 1) % colors.length
      char.el.style.color = colors[char.color]
      char.el.classList.remove("is-pop")
      void char.el.offsetWidth
      char.el.classList.add("is-pop")
    })
    char.el.addEventListener("animationend", () => char.el.classList.remove("is-pop"))
  })

  // 近づいたマウスから逃げて、バネで元の位置に戻る
  if (window.matchMedia("(pointer: fine)").matches && !reducedMotion.matches) {
    const radius = 170
    const strength = 46
    let pointer = null
    let frame = 0
    const step = () => {
      let moving = false
      chars.forEach((char) => {
        char.tx = 0
        char.ty = 0
        if (pointer) {
          const rect = char.el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2 - char.x
          const cy = rect.top + rect.height / 2 - char.y
          const dx = cx - pointer.x
          const dy = cy - pointer.y
          const distance = Math.hypot(dx, dy) || 1
          if (distance < radius) {
            const push = (1 - distance / radius) ** 2 * strength
            char.tx = (dx / distance) * push
            char.ty = (dy / distance) * push
          }
        }
        char.vx = (char.vx + (char.tx - char.x) * 0.16) * 0.74
        char.vy = (char.vy + (char.ty - char.y) * 0.16) * 0.74
        char.x += char.vx
        char.y += char.vy
        if (Math.abs(char.vx) + Math.abs(char.vy) + Math.abs(char.tx - char.x) + Math.abs(char.ty - char.y) > 0.05) moving = true
        char.el.style.translate = `${char.x.toFixed(2)}px ${char.y.toFixed(2)}px`
      })
      frame = moving || pointer ? requestAnimationFrame(step) : 0
    }
    section.addEventListener("pointermove", (event) => {
      pointer = { x: event.clientX, y: event.clientY }
      if (!frame) frame = requestAnimationFrame(step)
    })
    section.addEventListener("pointerleave", () => {
      pointer = null
      if (!frame) frame = requestAnimationFrame(step)
    })
  }

  // 画面に入ったら下線を引き、画面外ではアニメーションを止める
  if (!("IntersectionObserver" in window)) {
    section.classList.add("is-in", "is-active")
    return
  }
  new IntersectionObserver(
    ([entry]) => {
      section.classList.toggle("is-active", entry.isIntersecting)
      if (entry.isIntersecting) section.classList.add("is-in")
    },
    { threshold: 0.2 },
  ).observe(section)
}
