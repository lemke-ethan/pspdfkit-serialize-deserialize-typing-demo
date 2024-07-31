import "./App.css";
import PSPDFKit, { AnnotationsUnion, List } from "pspdfkit";

//@ts-ignore ignore the unused function
function exampleOne(): void {
  /*
    EXAMPLE 1
  
    source: https://pspdfkit.com/guides/web/importing-exporting/instant-json/
  */

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
    error TS2345: Argument of type 'AnnotationBackendJSON<RectangleAnnotationJSON, never>' is not assignable to parameter of type 'AnnotationJSONUnion'.
    Type 'AnnotationBackendJSON<RectangleAnnotationJSON, never>' is not assignable to type 'RectangleAnnotationJSON'.
      Type 'AnnotationBackendJSON<RectangleAnnotationJSON, never>' is not assignable to type '{ strokeWidth: number; strokeColor: string | null; fillColor: string | null; strokeDashArray?: [number, number] | null | undefined; measurementPrecision?: IMeasurementPrecision | null | undefined; measurementScale?: MeasurementScaleJSON | ... 1 more ... | undefined; lineWidth?: number | ... 1 more ... | undefined; }'.
        Types of property 'strokeWidth' are incompatible.
          Type 'number | undefined' is not assignable to type 'number'.
            Type 'undefined' is not assignable to type 'number'.
  */
  const deserializedAnnotation =
    PSPDFKit.Annotations.fromSerializableObject(annotationJSON);

  console.log(deserializedAnnotation);
}

//@ts-ignore ignore the unused function
function exampleTwo(): void {
  /*
    EXAMPLE 2
    
    mixing the docs example with the pdf load function instead of the deserializer
  */

  const annRect = new PSPDFKit.Annotations.RectangleAnnotation({
    pageIndex: 0,
    boundingBox: new PSPDFKit.Geometry.Rect({
      left: 100,
      top: 150,
      width: 200,
      height: 75,
    }),
  });
  const annRectJson = PSPDFKit.Annotations.toSerializableObject(annRect);
  const annLine = new PSPDFKit.Annotations.LineAnnotation({
    pageIndex: 0,
    boundingBox: new PSPDFKit.Geometry.Rect({
      left: 100,
      top: 150,
      width: 200,
      height: 75,
    }),
  });
  const annLineJson = PSPDFKit.Annotations.toSerializableObject(annLine);
  PSPDFKit.load({
    document: "",
    container: "",
    instantJSON: {
      format: "https://pspdfkit.com/instant-json/v1",
      annotations: [
        /*
          error TS2322: Type 'AnnotationBackendJSON<RectangleAnnotationJSON, never>' is not assignable to type 'AnnotationJSONUnion'.
        */
        annRectJson,
        /*
          error TS2322: Type 'AnnotationBackendJSON<LineAnnotationJSON, never>' is not assignable to type 'AnnotationJSONUnion'.
          Type 'AnnotationBackendJSON<LineAnnotationJSON, never>' is not assignable to type 'LineAnnotationJSON'.
            Type 'AnnotationBackendJSON<LineAnnotationJSON, never>' is not assignable to type '{ strokeWidth: number; strokeColor: string | null; fillColor: string | null; strokeDashArray?: [number, number] | null | undefined; measurementPrecision?: IMeasurementPrecision | null | undefined; measurementScale?: MeasurementScaleJSON | ... 1 more ... | undefined; lineWidth?: number | ... 1 more ... | undefined; }'.
              Types of property 'strokeWidth' are incompatible.
                Type 'number | undefined' is not assignable to type 'number'.
                  Type 'undefined' is not assignable to type 'number'.
        */
        annLineJson,
      ],
    },
  });
}

//@ts-ignore ignore the unused function
function exampleThree(newAnnotations: List<AnnotationsUnion>): void {
  /*
    EXAMPLE 3
    
    using load with the serialized annotations from the annotation event handler
  */

  const newAnnotationJsons = newAnnotations.map(
    PSPDFKit.Annotations.toSerializableObject
  );
  PSPDFKit.load({
    document: "",
    container: "",
    instantJSON: {
      format: "https://pspdfkit.com/instant-json/v1",
      /*
        error TS2739: Type 'List<AnnotationsBackendJSONUnion>' is missing the following properties from type 'AnnotationJSONUnion[]': length, fill, copyWithin, flat, [Symbol.unscopables]
      */
      annotations: newAnnotationJsons,
    },
  });
}

function App() {
  return <div className="app"></div>;
}

export default App;
