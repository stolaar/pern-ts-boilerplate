import IAnswerStyleProps from "./IAnswerStyleProps";

interface IAnswer {
    answer_id: number;
    answer?: string;
    image?: string;
    onClick?: () => any;
    checked?: boolean;
    disabled?: boolean;
    answer_translation_id: string;
    styleProps?: IAnswerStyleProps
}

export default IAnswer
