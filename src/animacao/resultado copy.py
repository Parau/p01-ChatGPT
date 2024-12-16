from manim import *
import numpy as np

config.background_color = WHITE

def elastic_out(t):
    c4 = (2 * np.pi) / 3
    return 1 if t == 0 else 1 if t == 1 else pow(2, -10 * t) * np.sin((t * 10 - 0.75) * c4) + 1

class NivelAnimacao(Scene):
    def construct(self):
        # Carregar os arquivos SVG
        niveis = [
            SVGMobject(f"nivel{i}.svg").scale(0.5) for i in range(1, 8)
        ]
        
        # Posicionar os SVGs na horizontal
        for i, nivel in enumerate(niveis):
            nivel.move_to(LEFT * 3.5 + RIGHT * i)
        
        # Adicionar os SVGs à cena
        self.play(*[Create(nivel) for nivel in niveis])
        
        # Adicionar a seta
        seta = Arrow(start=DOWN, end=UP, buff=0).next_to(niveis[0], DOWN)
        self.play(Create(seta))
        
        # Posicionar a seta embaixo do primeiro nível
        seta.next_to(niveis[0], DOWN)
        self.play(seta.animate.next_to(niveis[0], DOWN).set_color(RED))
        self.wait(0.5)

        # Animar a seta de forma elástica até a posição do nível 4
        self.play(seta.animate.next_to(niveis[3], DOWN).set_color(RED), rate_func=elastic_out, run_time=4)
        
        # Manter a animação na tela por 2 segundos
        self.wait(2)

