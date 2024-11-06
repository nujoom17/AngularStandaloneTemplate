import {
    animate,
    AnimationBuilder,
    AnimationPlayer,
    query,
    stagger,
    style,
  } from "@angular/animations";
  import {
    AfterViewInit,
    Directive,
    ElementRef,
    OnDestroy,
    OnInit,
  } from "@angular/core";
  
  @Directive({
    selector: "[appCustomAnimate]",
    standalone: true
  })
  export class CustomAnimateDirective implements AfterViewInit, OnDestroy {
    constructor(public el: ElementRef, private animBuilder: AnimationBuilder) {}
    player!: AnimationPlayer;
  
    ngAfterViewInit() {
      const translateAndFadeOut = this.animBuilder.build([
        style({ opacity: 0, transform: "scale(1.75)" }),
        animate("550ms", style({ opacity: 1, transform: "scale(1)" })),
      ]);
  
      const translateAndFadeIn = this.animBuilder.build([
        style({ opacity: 0, transform: "scale(0.25)" }),
        animate("550ms", style({ opacity: 1, transform: "scale(1)" })),
      ]);
  
      const translate3d = this.animBuilder.build([
        style({ opacity: 0 }),
        animate("1s", style({ opacity: 1, transform: "rotateY(360deg)" })),
      ]);
  
      const staggerLoad = this.animBuilder.build([
        query(
          ":enter",
          [
            style({ opacity: 0, height: 0 }),
            stagger(800, animate("0.25s ease-in", style({ opacity: 1 }))),
          ],
          { optional: true }
        ),
      ]);
  
      const staggerTransitionTableRow = this.animBuilder.build([
        style({ transform: "translateY(-100%)", opacity: 0 }),
        animate(
          "425ms",
          style({
            transform: "translateY(0)",
            "overflow-x": "hidden",
            opacity: 1,
          })
        ),
      ]);
  
      const transitionFromSide = this.animBuilder.build([
        style({ transform: "translateX(100%)", opacity: 0 }),
        animate(
          "425ms",
          style({
            transform: "translateX(0)",
            "overflow-x": "hidden",
            opacity: 1,
          })
        ),
      ]);
      let animationToPlay = this.el.nativeElement?.tagName?.toUpperCase();
  
      let animeMap:any = {
        FORM: translateAndFadeIn,
        DIV: translateAndFadeOut,
        TR: staggerTransitionTableRow,
        IMG: translate3d,
        H2: translateAndFadeIn,
      };
  
      if (
        animationToPlay == "DIV" &&
        [...this.el.nativeElement?.classList].includes("side-transition")
      ) {
        animeMap["DIV"] = transitionFromSide;
      }
      //add additional tags into above object with corresponding animation style and
      //then inject this directive selector into the html tag where it needs to be triggered
      this.player = animeMap[animationToPlay].create(this.el.nativeElement);
      this.player.play();
    }
  
    ngOnDestroy(): void {}
  }
  