const model = (context) => {
  return {
    color: '#0091EA',
    size: 1,
    yOff: Math.random(10),
    xOff: Math.random(10)
  }
}

const update = (context, state) => {
  state.xOff = state.xOff - 0.005
  state.yOff = state.xOff + 0.005
  return state
}

const render = (context, state) => {
  const {width, height} = context.canvas
  context.fillStyle = state.color
  context.save()
  context.translate(width / 2, height / 2)
  let yOff = state.yOff
  for (let y = width / -8; y <= width / 8; y += 4) {
    yOff += 0.02
    let xOff = state.xOff
    for (let x = width / -8; x <= width / 8; x += 4) {
      xOff += 0.02
      const factor = noise(xOff, yOff)
      context.beginPath()
      context.arc(x * factor * 2, y * factor * 2, state.size * factor * 2, 0, Math.PI * 2)
      context.fill()
    }
  }
  context.restore()
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

const noise = (x, y = 0, z = 0) => {
  if (x < 0) { x = -x }
  if (y < 0) { y = -y }
  if (z < 0) { z = -z }

  const octaves = 4
  const falloffRate = 0.8

  const yWrapB = 4
  const yWrap = 1 << yWrapB
  const zWrapB = 8
  const zWrap = 1 << zWrapB

  let xi = parseInt(x)
  let yi = parseInt(y)
  let zi = parseInt(z)

  let xf = x - xi
  let yf = y - yi
  let zf = z - zi

  let rxf = 0
  let ryf = 0

  var r = 0
  var amplitude = 0.5

  let n1
  let n2
  let n3

  const length = noiseInternal.length - 1

  for (let i = 0; i < octaves; ++i) {
    let of = xi + (yi << yWrapB) + (zi << zWrapB)

    rxf = scaledCosine(xf)
    ryf = scaledCosine(yf)

    n1 = noiseInternal[of & length]
    n1 = n1 + rxf * (noiseInternal[(of + 1) & length] - n1)
    n2 = noiseInternal[(of + yWrap) & length]
    n2 = n2 + rxf * (noiseInternal[(of + yWrap + 1) & length] - n2)
    n1 = n1 + ryf * (n2 - n1)

    of += zWrap

    n2 = noiseInternal[of & length]
    n2 = n2 + rxf * (noiseInternal[(of + 1) & length] - n2)
    n3 = noiseInternal[(of + yWrap) & length]
    n3 = n3 + rxf * (noiseInternal[(of + yWrap + 1) & length] - n3)
    n2 = n2 + ryf * (n3 - n2)

    n1 += scaledCosine(zf) * (n2 - n1)

    r += n1 * amplitude

    amplitude = amplitude * falloffRate

    xi = xi << 1
    xf = xf * 2
    yi = yi << 1
    yf = yf * 2
    zi = zi << 1
    zf = zf * 2

    if (xf >= 1.0) {
      xi = xi + 1
      xf = xf - 1
    }

    if (yf >= 1.0) {
      yi = yi + 1
      yf = yf - 1
    }

    if (zf >= 1.0) {
      zi = zi + 1
      zf = zf - 1
    }
  }
  return r
}

const noiseInternal = new Float32Array(4096)

for (var i = 0; i < noiseInternal.length; i++) {
  noiseInternal[i] = Math.random()
}

const scaledCosine = (i) => {
  return 0.5 * (1.0 - Math.cos(i * Math.PI))
}
