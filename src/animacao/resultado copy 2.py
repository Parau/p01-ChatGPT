from manim import *
import numpy as np

config.background_color = WHITE

class ProficiencyLevel(Scene):
    def construct(self):
        # Carregar os SVGs dos níveis 1 a 7
        levels = [SVGMobject(f"nivel{i}.svg") for i in range(1, 8)]
        
        # Dispor os SVGs horizontalmente
        for i, level in enumerate(levels):
            level.scale(0.8)  # Ajustar o tamanho dos SVGs
            level.shift(RIGHT * (i - 3))  # Posicionar os SVGs horizontalmente

        # Adicionar os SVGs à cena um de cada vez com efeito de aumento de tamanho a partir de 0
        for level in levels:
            #level.scale(0.5)  # Começar com tamanho zero
            self.play(GrowFromCenter(level, scale_factor=20), run_time=0.3)
        
        # Animação de aumento e diminuição dos SVGs em paralelo com intervalo
        self.play(LaggedStart(*[level.animate.scale(1.5) for level in levels], lag_ratio=0.1), run_time=0.5)
        self.play(LaggedStart(*[level.animate.scale(0.85) for level in levels], lag_ratio=0.1), run_time=0.1)
        
        # Destacar o nível de proficiência 4
        level_4 = levels[3]
        self.play(level_4.animate.scale(1.5).set_color(YELLOW))
        self.wait(2)


