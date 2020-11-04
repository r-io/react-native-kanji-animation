/**
 * typescript definition
 * @author rio
 */

declare module "react-native-kanji-animation" {
    import React from "react";
    import { PathProps } from "react-native-svg";
    import { Animated, StyleProp, ViewStyle } from "react-native";
    import SVGPathProperties from "svg-path-properties/dist/types/svg-path-properties";

    export interface KanjiProperties {
        containerStyle?: StyleProp<ViewStyle>;
        easing?: (value: number) => number;
        element: string;
        duration?: number;
        size?: number;
        step?: number;
        placeholder?: boolean;
        previousStep?: boolean;
        pathProps?: PathProps;
        placeholderProps?: PathProps;
        onPress?: () => void;
        onLongPress?: () => void;
    }

    export class Kanji extends React.Component<KanjiProperties> {
        animate(callback?: Animated.EndCallback): void;
        numOfStrokes(): number;
        strokeProperties(): SVGPathProperties[];
    }
}