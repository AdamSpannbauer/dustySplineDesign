# dustySplineDesign

* Gen designs at https://adamspannbauer.github.io/dustySplineDesign/
* Control design with URL params
  * Example of URL using all params
    * https://adamspannbauer.github.io/dustySplineDesign/?randSeed=42&D=3&nSize=200&nSclX=0.02&nSclY=0.2
  * Use `D=3` to render in 3d
  * Use `D=saveSVG` to save slices to SVGs
  * Use `randSeed` for repeatability
    * eg https://adamspannbauer.github.io/dustySplineDesign/?randSeed=1337
  * Use `nSize` for controlling size of peaks (defaults to 200)
    * eg https://adamspannbauer.github.io/dustySplineDesign/?nSize=100
  * Use `nSclX` for controlling how much the splines differ from their neighbors (defaults to 0.01)
    * eg https://adamspannbauer.github.io/dustySplineDesign/?nSclX=0.003
    * reasonable range is 0.001 for similiar waves and 0.5 to get a lot of variation
  * Use `nSclY` for controlling how the control points withing a spline differ (defaults to 0.2)
    * eg https://adamspannbauer.github.io/dustySplineDesign/?nSclY=0.2
    * reasonable range is 0.001 for boring splines and 0.5 for more turbulent ones
* If rendering in 2d, view design from different angles with the keys <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd> (not available in 3d), and <kbd>d</kbd>
  * <kbd>1</kbd> - side view of each curve plotted at once
  * <kbd>2</kbd> - animated one at a time side view of each slice
  * <kbd>3</kbd> - top down view (doesn't look great tbh...)
  * <kbd>d</kbd> - downloads the spline data to a JSON file
