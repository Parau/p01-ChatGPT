from manim import *

config.background_color = WHITE

class SquareToCircle(Scene):
    def construct(self):
        square = Square()  # Create a square
        circle = Circle()  # Create a circle

        self.play(Create(square))  # Show the square on screen
        self.play(Transform(square, circle))  # Transform the square into a circle
        self.play(FadeOut(square))  # Fade out the circle

class DisplaySVG(Scene):
    def construct(self):
        # Carrega o arquivo SVG
        svg = SVGMobject("data-processing.svg")
        
        # Centraliza o SVG na tela
        svg.move_to(ORIGIN)
        
        # Adiciona o SVG à cena
        self.play(DrawBorderThenFill(svg))
        
        # Mantém o SVG na tela por 2 segundos
        self.wait(2)

class Processando(Scene):
    def construct(self):
        # Carrega o arquivo SVG
        svg = SVGMobject("data-processing.svg")
        
        # Centraliza o SVG na tela
        svg.move_to(ORIGIN)
        
        # Adiciona o SVG à cena com diferentes animações
        self.play(Write(svg))
        self.wait(1)
        self.play(ScaleInPlace(svg, scale_factor=2))
        #self.wait(2)
        # Adiciona a animação de rotação
        self.play(Rotate(svg, angle=2 * PI))  # Gira o SVG duas vezes (2 * PI radianos)
        self.play(ScaleInPlace(svg, scale_factor=2))
        # Adiciona a animação de rotação
        self.play(Rotate(svg, angle=2 * PI))  # Gira o SVG duas vezes (2 * PI radianos)
        self.wait(2)