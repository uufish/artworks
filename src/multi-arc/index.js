const model = (context) => {
  const {width, height} = context.canvas
  return array(100, () => {
    return {
      color: '#0091EA',
      size: 4 + 10 * Math.random(),
      rad: Math.random() * Math.PI * 2,
      radAcc: (Math.PI / (40 + 100 * Math.random())) * (Math.random() < 0.5 ? -1 : 1),
      r: 100 + Math.random() * (width / 4),
      width: 1 + Math.random() * 20,
      pos: new Int16Array([width / 2, height / 2])
    }
  })
}

const update = (context, states) => {
  return states.map(state => {
    const {width, height} = context.canvas

    state.rad = state.rad > Math.PI * 2
      ? 0
      : state.rad + state.radAcc

    state.pos[0] = width / 2 +
      state.r * Math.sin(state.rad)

    state.pos[1] = height / 2 +
      state.r * Math.cos(state.rad)

    return state
  })
}

const render = (context, states) => {
  const {width, height} = context.canvas
  states.forEach(state => {
    context.lineWidth = state.width
    context.strokeStyle = state.color
    context.beginPath()
    context.arc(width / 2, height / 2, state.r, state.rad, state.rad + Math.PI / 4)
    context.stroke()
  })
}

const animationFrame = (context, _state, updates) => {
  const {width, height} = context.canvas
  context.clearRect(0, 0, width, height)
  const state = updates(context, _state)
  render(context, state)
  requestAnimationFrame(animationFrame.bind(null, context, state, updates))
}

const main = () => {
  const canvas = document.querySelector('.canvas')
  const context = canvas.getContext('2d')
  const state = model(context)
  animationFrame(context, state, update)
}

window.addEventListener('load', main)

const array = (n, func) => {
  const array = []
  if (func) {
    for (let i = 0; i < n; ++i) {
      array.push(func(i))
    }
  } else {
    for (let i = 0; i < n; ++i) {
      array.push(null)
    }
  }
  return array
}
