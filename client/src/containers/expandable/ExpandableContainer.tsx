import React, {Fragment, useEffect, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import './ExpandableContainer.css'

function ExpandableContainer({title,expanded = false,onExpand, className,containerClassName, ...props}: { [k: string]: any, title: string;className?: string;expanded?: boolean, onExpand?: any }) {
    const [showForm, setForm] = useState(false)

    useEffect(() => {
        setForm((oldValue: boolean) => oldValue === expanded ? oldValue : expanded)
    }, [expanded])


    const onExpandChange = () => {
        onExpand && onExpand()
        setForm((oldVal: boolean) => !oldVal)
    }

    return <Fragment>
        <div className={containerClassName} onClick={onExpandChange}>{title} <FontAwesomeIcon
                                            icon={!showForm ? faChevronDown : faChevronUp} /></div>
        <div className={classnames('expandable-container', className, {'collapsed': !showForm})}>
            {props.children}
        </div>
    </Fragment>
}

export default ExpandableContainer
