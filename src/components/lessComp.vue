<template>
  <div>
    <h1>Less</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
// no-duplicate-at-import-rules
// @import 'a.css';
// @import 'a.css';

@import url('../styles/less/index.less');

.container {
  height: @height;
  // height: @height;

  // no-descending-specificity
  // #container a {
  //   top: 10px;
  // }

  // a {
  //   top: 0;
  // }

  // declaration-block-no-duplicate-custom-properties
  // .a {
  //   --custom-property: pink;
  //   --custom-property: orange;
  // }

  /* declaration-block-no-duplicate-properties */
  // .b {
  //   color: #000;
  //   color: #333;
  // }

  /* keyframe-block-no-duplicate-selectors */
  // @keyframes foo {
  //   0% {
  //     opacity: 0;
  //   }

  //   0% {
  //     opacity: 1;
  //   }
  // }

  // font-family-no-duplicate-names
  // .c {
  //   font-family: 'Times', Times, serif;
  // }

  // no-duplicate-selector
  // .foo,
  // .bar,
  // .foo {
  //   color: aquamarine;
  // }

  // block-no-empty
  // .d {
  // }

  // comment-no-empty
  //

  // color-no-invalid-hex
  // .e {
  //   color: #33;
  // }

  // function-calc-no-unspaced-operator
  // .f {
  //   top: calc(1px+ 2px);
  // }

  // keyframe-declaration-no-important
  // @keyframes bar {
  //   from {
  //     opacity: 0;
  //   }
  //   to {
  //     opacity: 1 !important;
  //   }
  // }

  // media-query-no-invalid
  // @media (width == 100px) {
  //   body {
  //     font-size: 12px;
  //   }
  // }

  // named-grid-areas-no-invalid
  // .g {
  //   grid-template-areas:
  //     'a a a'
  //     'b b a';
  // }

  // no-invalid-position-at-import-rule
  // .i {
  //   color: aliceblue;
  // }
  // @import 'foo.css';

  // string-no-newline
  // .j {
  //   content: "first
  //   second";
  // }

  // custom-property-no-missing-var-function
  // :root {
  //   --foo: red;
  // }
  // .k {
  //   color: --foo;
  // }

  // font-family-no-missing-generic-family-keyword
  // .l {
  //   font-family: Helvetica, Arial, Verdana, Tahoma;
  // }

  // function-linear-gradient-no-nonstandard-direction
  // .m {
  //   background: linear-gradient(top, #fff, #000);
  // }

  // declaration-block-no-shorthand-property-overrides
  // .n {
  //   padding-left: 10px;
  //   padding: 20px;
  // }

  // selector-anb-no-unmatchable
  // .o:nth-last-child(0n) {
  //   border: none;
  // }

  // annotation-no-unknown
  // .p {
  //   color: green !imprtant;
  // }

  // at-rule-no-unknown
  // @unknown (width >= 960px) {
  //   body {
  //     font-size: 12px;
  //   }
  // }

  // declaration-property-value-no-unknown
  // .q {
  //   top: unknown;
  // }

  // function-no-unknown
  // .r {
  //   transform: unknown(1);
  // }

  // media-feature-name-no-unknown
  // @media screen and (unknown > 10px) {
  // }

  // property-no-unknown
  // .s {
  //   my-property: 1;
  // }

  // selector-pseudo-class-no-unknown
  // .t:unknown {
  //   font-size: 12px;
  // }

  // selector-pseudo-element-no-unknown
  // .u::element {
  //   font-size: 12px;
  // }

  // selector-type-no-unknown
  // tag {
  //   font-size: 12px;
  // }

  // unit-no-unknown
  // .v {
  //   width: 10pixels;
  // }

  // at-rule-no-vendor-prefix
  // @-webkit-keyframes slidein {
  //   0% {
  //     top: 0;
  //   }
  // }

  // length-zero-no-unit
  // .w {
  //   top: 0px;
  // }

  // media-feature-name-no-vendor-prefix
  // @media (-webkit-min-device-pixel-ratio: 1) {
  // }

  // property-no-vendor-prefix
  // .x {
  //   -webkit-transform: scale(1);
  // }

  // selector-no-vendor-prefix
  // input::-moz-placeholder {
  // }

  // value-no-vendor-prefix
  // .y {
  //   display: -webkit-flex;
  // }

  // function-name-case
  // .z {
  //   width: Calc(5% - 10em);
  // }

  // selector-type-case
  // LI {
  // }

  // value-keyword-case
  // .aa {
  //   display: BLOCK;
  // }

  // at-rule-empty-line-before
  // @media {
  // }

  // declaration-block-single-line-max-declarations
  // .bb { color: pink; top: 0; }

  // number-max-precision
  // .cc {
  //   top: 3.245634px;
  // }

  // alpha-value-notation
  // .dd {
  //   opacity: 50%;
  // }

  // color-function-notation
  // .ee {
  //   color: rgb(0, 0, 0);
  // }

  // color-hex-length
  // .ff {
  //   color: #ffffff;
  // }

  // hue-degree-notation
  // .gg {
  //   color: hsl(198 28% 50%);
  // }

  // import-notation
  // @import url('foo.css');

  // keyframe-selector-notation
  // @keyframes foo {
  //   from {
  //   }

  //   100% {
  //   }
  // }

  // media-feature-range-notation
  // @media (min-width: 1px) {
  // }

  // selector-not-notation
  // :not(a):not(div) {
  // }

  // selector-pseudo-element-colon-notation
  // .hh:before {
  //   color: pink;
  // }

  // custom-media-pattern
  // @custom-media --fooBar (min-width: 30em);

  // custom-property-pattern
  // :root {
  //   --booBar: 0;
  // }

  // keyframes-name-pattern
  // @keyframes fooBar {
  // }

  // selector-class-pattern
  // .fooBar {
  //   font-size: 12px;
  // }

  // selector-id-pattern
  // #fooBar {
  //   font-size: 12px;
  // }

  // font-family-name-quotes
  // .ii {
  //   font-family: Times New Roman, Times, serif;
  // }

  // function-url-quotes
  // @import url(foo.css);

  // selector-attribute-quotes
  // [title=flower] {}

  // declaration-block-no-redundant-longhand-properties
  // .jj {
  //   margin-top: 1px;
  //   margin-right: 2px;
  //   margin-bottom: 3px;
  //   margin-left: 4px;
  // }

  // shorthand-property-no-redundant-values
  // .kk {
  //   margin: 1px 1px 1px 1px;
  // }

  // comment-whitespace-inside
  // /*comment*/
}
</style>
