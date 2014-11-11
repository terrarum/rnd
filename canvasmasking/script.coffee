$(window).load ->
  canvas1 = document.getElementById "canvas1"
  canvas2 = document.getElementById "canvas2"
  canvas3 = document.getElementById "canvas3"
  canvas4 = document.getElementById "canvas4"

  chairImage = document.getElementById "img-chair"
  personImage = document.getElementById "img-person"
  maskImage = document.getElementById "img-mask"

  # Set all canvases to the sprite size.
  canvas1.height = chairImage.height
  canvas1.width = chairImage.width

  canvas2.height = personImage.height
  canvas2.width = personImage.width

  canvas3.height = maskImage.height
  canvas3.width = maskImage.width

  canvas4.height = maskImage.height
  canvas4.width = maskImage.width

  # Get canvas contexts.
  c1ctx = canvas1.getContext "2d"
  c2ctx = canvas2.getContext "2d"
  c3ctx = canvas3.getContext "2d"
  c4ctx = canvas4.getContext "2d"

  c1ctx.drawImage chairImage, 0, 0
  c2ctx.drawImage personImage, 0, 0
  c3ctx.drawImage maskImage, 0, 0

  chairData   = c1ctx.getImageData 0, 0, canvas1.width, canvas1.height
  personData  = c2ctx.getImageData 0, 0, canvas2.width, canvas2.height
  maskData    = c3ctx.getImageData 0, 0, canvas3.width, canvas3.height
  finalData   = c4ctx.getImageData 0, 0, canvas4.width, canvas4.height

  pixels = chairData.width * chairData.height

  # R G B A

  i = 0
  while i < pixels
    pos = i * 4

    # Should be comparing and copying either chair or person to canvas 4 on the fly.
    # If mask or not chair, copy person
    # else copy chair

    # If the mask pixel is black and fully visible and the chair pixel is visible (alpha > 0), make the person's pixel invisible.
    if maskData.data[pos] is 0 and maskData.data[pos + 1] is 0 and maskData.data[pos + 2] is 0 and maskData.data[pos + 3] is 255 and chairData.data[pos + 3] > 0
      personData.data[pos]     = 0
      personData.data[pos + 1] = 0
      personData.data[pos + 2] = 0
      personData.data[pos + 3] = 0

    # If the person's alpha is greater than 0, copy the person data to the chair data. This is the final output.
    if personData.data[pos + 3] > 0
      chairData.data[pos]     = personData.data[pos]
      chairData.data[pos + 1] = personData.data[pos + 1]
      chairData.data[pos + 2] = personData.data[pos + 2]
      chairData.data[pos + 3] = personData.data[pos + 3]

    i++

    # Draw the final output.
  c4ctx.putImageData chairData, 0, 0