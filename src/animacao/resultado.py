from manim import *

class Indications(Scene):
    def construct(self):
        # Carregar os arquivos SVG
        svg_files = [f"nivel{i}.svg" for i in range(1, 8)]
        indications = [ApplyWave, Circumscribe, Flash, FocusOn, Indicate, ShowPassingFlash, Wiggle]
        svgs = [SVGMobject(file).scale(1) for file in svg_files]
        texts = [Text(f"Nível {i}").next_to(svgs[i-1], RIGHT) for i in range(1, 8)]

        self.add(svgs[0], texts[0])
        for i in range(len(svgs)):
            if indications[i] is Flash:
                self.play(Flash(UP))
            elif indications[i] is ShowPassingFlash:
                self.play(ShowPassingFlash(Underline(svgs[i])))
            else:
                self.play(indications[i](svgs[i]))
            self.play(AnimationGroup(
                FadeOut(svgs[i], shift=UP * 1.5),
                FadeOut(texts[i], shift=UP * 1.5),
                FadeIn(svgs[(i + 1) % len(svgs)], shift=UP * 1.5),
                FadeIn(texts[(i + 1) % len(texts)], shift=UP * 1.5),
            ))