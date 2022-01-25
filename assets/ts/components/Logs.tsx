import React, {useEffect} from 'react'
import 'react-virtualized/styles.css';
import {AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps} from 'react-virtualized';
import {useWindowSize} from "../utils/hooks";

const cache = new CellMeasurerCache({
    defaultHeight: 45.5,
    fixedWidth: true
});

const copyToClipBoard = (content: string) => {
    if (!navigator.clipboard) {
        // Clipboard API not available
        return
    }

    navigator.clipboard.writeText(content)
}

const Logs = ({logs}: { logs: any[] }) => {
    const size = useWindowSize()


    useEffect(() => {
        cache.clearAll()
    }, [size.width])

    const logRenderer = ({key, parent, style, index}: ListRowProps) => {
        const log = logs[index]

        return (
            <CellMeasurer
                cache={cache}
                columnIndex={0}
                key={key}
                parent={parent}
                rowIndex={index}
            >
                <div className={`log log--${log.type}`} style={style}>
                    <div className="log__container">
                        <div className="type">{log.type}</div>
                        <div>
                            {log.type === "DEBUG" && (
                                <code>
                                    {log.content}
                                    <button onClick={() => copyToClipBoard(log.content)}>
                                        <i className="fa-fw fa fa-copy"></i>
                                        <span>Copy</span>
                                    </button>
                                </code>
                            )}
                            {log.type !== "DEBUG" && (
                                <p>{log.content}</p>
                            )}
                        </div>
                    </div>
                </div>
            </CellMeasurer>
        )
    }

    return (
        <>
            <dt>
                Logs
            </dt>
            <dd style={{height: 500}}>
                <AutoSizer>
                    {({height, width}) => (
                        <List
                            className="log__list"
                            width={width}
                            height={height}
                            rowHeight={cache.rowHeight}
                            rowRenderer={logRenderer}
                            rowCount={logs.length}
                            overscanRowCount={3}
                            deferredMeasurementCache={cache}
                        />
                    )}
                </AutoSizer>
            </dd>
        </>
    )
}

export default Logs

