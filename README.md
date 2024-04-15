# pspdfkit-serialize-deserialize-typing-demo

A demo of typescript types for serializing and deserializing PSPDFKit annotations.

- PSPDFKit v2024.3.0
- Typescript v5.4.4
- React v18

## the problem

`PSPDFKitWeb.Annotations.toSerializableObject` returns a `AnnotationsBackendJSONUnion` or related type instead of type `AnnotationJSONUnion`.

It does not seem like this is intended given [the first example](https://pspdfkit.com/guides/web/importing-exporting/instant-json/) in the documentation. i.e., it shows you how to create an annotation and then serializes that annotation to JSON. Then it shows you how to create an annotation out of that serialized annotation. However, there is a type error because `toSerializableObject` returns a serialized annotation of type `AnnotationBackendJSON<RectangleAnnotationJSON, never>` but `fromSerializableObject` expects an argument whose type extends `AnnotationJSONUnion`.

I first noticed this in the markup created event handler. The markup created event handler is called with a collection of `Annotation<AnnotationProperties>`, which we serialize to JSON using `PSPDFKitWeb.Annotations.toSerializableObject` so we can store it in the InstantJSON type. We use the InstantJSON type to store the markups so we can later pass them to PSPDFKitWeb.load.

## run the demo

1. `npm install`
1. `npm run build` to see the type errors
