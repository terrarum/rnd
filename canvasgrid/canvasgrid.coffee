$ ->

  app =
    init: ->
      # Display mouse coordinates.
      $('#canvas').mousemove (e) ->
        $("#debug-mouseX").html e.offsetX + "px"
        $("#debug-mouseY").html e.offsetY + "px"

      # Display mouse down coordinates.
      $('#canvas').mousedown (e) =>
        $("#debug-mouseclickX").html e.offsetX + "px"
        $("#debug-mouseclickY").html e.offsetY + "px"
        hitTest e.offsetX, e.offsetY

      # Canvas
      canvas = document.getElementById("canvas")
      # Canvas context
      ctx = canvas.getContext "2d"
      ctx.lineWidth = 1

      # Framerate
      fps = 0
      oldtime = +new Date

      # Define what a grid square is
      squareModel = (x, y, size, id) ->
        square =
          x: x
          y: y
          size: size
          id: id
          hit: false
          drawn: false

      this.squareCollection = []

      squareSize = 32
      rows = 15
      cols = 20

      col = 0
      while col < cols
        row = 0
        while row < rows
          y = row * squareSize
          x = col * squareSize

          this.squareCollection.push new squareModel x, y, squareSize, "square" + col + row
          row++
        col++

      # Sees which box you clicked.
      hitTest = (x, y) =>
        $.each this.squareCollection, (i, square) =>
          if (x >= square.x && x <= square.x + square.size && y >= square.y && y <= square.y + square.size)
            square.drawn = false
            if (!square.hit)
              square.hit = true
              $('#debug-squarename').html square.id
              console.log square.x
            else
              square.hit = false

      # Render the grid!
      renderThings = =>
        $.each this.squareCollection, (i, square) ->
          if (!square.drawn)
            ctx.clearRect square.x, square.y, square.size, square.size
            square.drawn = true
            if (square.hit)
              fillSquare square
            else
              drawSquare square

      # Draw a square.
      drawSquare = (square) ->
        ctx.rect square.x, square.y, square.size, square.size
        ctx.stroke()

      # Draw a filled square.
      fillSquare = (square) ->
        ctx.fillStyle = "rgb(100,100,100)"
        ctx.fillRect square.x, square.y, square.size, square.size
        ctx.stroke()

      # The game loop.
      gameLoop = (time) ->
        # Calculate and output FPS
        fps = 1000 / (time - oldtime)
        oldtime = time
        $('#debug-fps').html fps

        renderThings()

        requestAnimationFrame gameLoop

      # Go!
      gameLoop()

  app.init()