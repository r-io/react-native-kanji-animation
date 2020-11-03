/**
 * typescript definition
 * @author rio
 */

declare module "react-native-kanji-animation" {
    import React from "react";
    import { PathProps } from "react-native-svg";
    import { StyleProp, ViewStyle } from "react-native";

    export interface KanjiProperties {
        containerStyle: StyleProp<ViewStyle>;
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
        animate(): void;
        numOfStrokes(): number;
    }
}