import "./App.css";
import PSPDFKit, { AnnotationsUnion, List } from "pspdfkit";

/*
  EXAMPLE 1

  source: https://pspdfkit.com/guides/web/importing-exporting/instant-json/
*/

//@ts-ignore ignore the unused function
function importAndExportAnnotations(annotations: List<AnnotationsUnion>): void {
  // Create and convert a rectangle annotation to Instant JSON.
  const annotation = new PSPDFKit.Annotations.RectangleAnnotation({
    pageIndex: 0,
    boundingBox: new PSPDFKit.Geometry.Rect({
      left: 100,
      top: 150,
      width: 200,
      height: 75,
    }),
  });
  const annotationJSON = PSPDFKit.Annotations.toSerializableObject(annotation);

  /*
  Argument of type 'AnnotationBackendJSON<RectangleAnnotationJSON, never>' is not assignable to parameter of type 'AnnotationJSONUnion'.
  Type 'AnnotationBackendJSON<RectangleAnnotationJSON, never>' is not assignable to type 'RectangleAnnotationJSON'.
    Type 'AnnotationBackendJSON<RectangleAnnotationJSON, never>' is not assignable to type '{ strokeWidth: number; strokeColor: string | null; fillColor: string | null; strokeDashArray?: [number, number] | null | undefined; measurementPrecision?: IMeasurementPrecision | null | undefined; measurementScale?: MeasurementScaleJSON | ... 1 more ... | undefined; lineWidth?: number | ... 1 more ... | undefined; }'.
      Types of property 'strokeWidth' are incompatible.
        Type 'number | undefined' is not assignable to type 'number'.
          Type 'undefined' is not assignable to type 'number'.ts(2345)
  */
  const deserializedAnnotation =
    PSPDFKit.Annotations.fromSerializableObject(annotationJSON);

  console.log(deserializedAnnotation);
}

function App() {
  return <div className="app"></div>;
}

export default App;
