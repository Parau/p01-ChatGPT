from manim import *
import numpy as np
config.background_color = WHITE
class Indications(Scene):
    def construct(self):
        # Carregar os arquivos SVG
        svg_files = [f"nivel{i}.svg" for i in range(1, 8)]
        indications = [ApplyWave, Circumscribe, Flash, FocusOn, Indicate, ShowPassingFlash, Wiggle]
        levelCaption = ['Curioso', 'Iniciante', 'Explorador', 'Construtor', 'Criador', 'Estrategista', 'Mestre']
        colors = [BLUE, YELLOW, RED, ORANGE, PURPLE, GREEN, "#FF00FF"]
        svgs = [SVGMobject(file).scale(1) for file in svg_files]
        texts = [Text(levelCaption[i-1], font="Tahoma").set_color(GREY).next_to(svgs[i-1], RIGHT) for i in range(1, 8)]

        levelTarget = 1  # 1..7
        self.add(svgs[0], texts[0])

        # animação de entrada
        #svgs[0].shift(DOWN * 1.5)
        #texts[0].shift(DOWN * 1.5)
        self.play(
            FadeIn(svgs[0], shift=UP * 4),
            FadeIn(texts[0], shift=UP * 4),
            run_time=0.8
        )
        
        # Primeiro loop: reduzir exponencialmente até 0.1
        for i in range(len(svgs) - 1):
            interval = 0.7 * np.exp(-i / (len(svgs) - 1))
            interval = max(interval, 0.1)  # Garantir que o intervalo não seja menor que 0.1
            if (i < (len(svgs) - 1)):
                self.play(AnimationGroup(
                    FadeOut(svgs[i], shift=UP * 2.5),
                    FadeOut(texts[i], shift=UP * 2.5),
                    FadeIn(svgs[(i + 1) % len(svgs)], shift=UP * 2.5),
                    FadeIn(texts[(i + 1) % len(texts)], shift=UP * 2.5),
                ), run_time=interval)
            else:
                # Deslocar mais para cima a posição final do SVG para o fade-in
                svgs[(i - 1) % len(svgs)].shift(UP * 1.5)
                texts[(i - 1) % len(texts)].shift(UP * 1.5)
                self.play(AnimationGroup(
                    FadeOut(svgs[i], shift=UP * 2.5),
                    FadeOut(texts[i], shift=UP * 2.5),
                    FadeIn(svgs[(i + 1) % len(svgs)], shift=UP * 4),
                    FadeIn(texts[(i + 1) % len(texts)], shift=UP * 4),
                ), run_time=interval)
        self.play(
        svgs[i+1].animate.shift(UP * 1.5),
        texts[i+1].animate.shift(UP * 1.5),
        #rate_func=there_and_back_with_pause,
        run_time=0.4
        )
   
        self.play(
        svgs[i+1].animate.shift(DOWN * 1.5),
        texts[i+1].animate.shift(DOWN * 1.5),
        #rate_func=there_and_back_with_pause,
        run_time=0.4
        )
        #self.wait(0.2)
        # Segundo loop: aumentar exponencialmente até 0.8
        for i in range(len(svgs) - 1, levelTarget - 1, -1):
            interval = 0.8 - (0.7 * (i - levelTarget) / (len(svgs) - levelTarget))
            interval = max(interval, 0.1)

            if (i == levelTarget) :
                # Deslocar mais para baixo a posição final do SVG para o fade-in
                svgs[(i - 1) % len(svgs)].shift(DOWN * 1.5)
                texts[(i - 1) % len(texts)].shift(DOWN * 1.5)
                self.play(AnimationGroup(
                    FadeOut(svgs[i], shift=DOWN * 2.5),
                    FadeOut(texts[i], shift=DOWN * 2.5),
                    FadeIn(svgs[(i - 1) % len(svgs)], shift=DOWN * 4.0),
                    FadeIn(texts[(i - 1) % len(texts)], shift=DOWN * 4.0),
                ), run_time=interval)  
            else:
                self.play(AnimationGroup(
                    FadeOut(svgs[i], shift=DOWN * 2.5),
                    FadeOut(texts[i], shift=DOWN * 2.5),
                    FadeIn(svgs[(i - 1) % len(svgs)], shift=DOWN * 2.5),
                    FadeIn(texts[(i - 1) % len(texts)], shift=DOWN * 2.5),
                ), run_time=interval)

        # Remover o último SVG e texto sem animação de fade
        #self.remove(svgs[levelTarget-1], texts[levelTarget])

        # Se for o último nível, deslocar o SVG e o texto para baixo
        if (levelTarget != 7):
            self.play(
            svgs[i-1].animate.shift(UP * 1.5),
            texts[i-1].animate.shift(UP * 1.5),
            #rate_func=there_and_back_with_pause,
            run_time=0.4
            )
        else:
            #ajusta o i para que faça o destaque no último elemento
            i = levelTarget
        
        # Agrupar o SVG e o texto
        final_group = VGroup(svgs[i-1], texts[i-1])

        # Adicionar animação Circumscribe ao SVG atual
        self.play(Indicate(final_group, color=ORANGE, time_width=0.2))

        self.wait(2) 
             