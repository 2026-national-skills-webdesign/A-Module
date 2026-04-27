const input = $(".fileInput")
const ph = $(".placeholder")
const canvas = $('canvas')
const ctx = canvas.getContext('2d')
const state = { image: null, rotation: 0, flipH: false, flipV: false, grayscale: false }

