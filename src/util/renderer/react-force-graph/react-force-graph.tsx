import React, { useRef } from "react";
import { ForceGraph2D } from "react-force-graph";
import { fetchGraphQLDataJSON } from "../../data/fetch";
import { formatData } from "../../formatter/react-force-graph";
import { parseData } from "../../parser/parser";
import ReactDOMServer from 'react-dom/server';
import useDimensions from "react-cool-dimensions";

const generateTooltip = (value) => {
    const tooltip = <div>
        {JSON.stringify(value)}
    </div>;
    return ReactDOMServer.renderToString(tooltip);
}


export const ReactForceGraphRenderer = ({
    data = undefined,
    layout = 'euler',
    style = {},
    interactions = {},
    showNavigator = false,
    graphqlUrl,
    graphqlQuery }) => {

    const [vizData, setVizData] = React.useState(undefined);
    const [firstRun, setFirstRun] = React.useState(true);

    const { observe, unobserve, width, height, entry } = useDimensions({
        onResize: ({ observe, unobserve, width, height, entry }) => {
            // Triggered whenever the size of the target is changed...
            unobserve(); // To stop observing the current target element
            observe(); // To re-start observing the current target element
        },
    });

    // parse visualization data if it is not yet set.
    if (vizData === undefined) {
        if (data === undefined && graphqlQuery !== undefined && graphqlUrl !== undefined) {
            fetchGraphQLDataJSON(graphqlUrl, graphqlQuery).then(_data => {

                var parsedData = parseData(_data);
                var formattedData = formatData(parsedData);
                setVizData(formattedData);
            });
        } else {
            console.log(data)
            var parsedData = parseData(data);
            var formattedData = formatData(parsedData);
            console.log(formattedData);
            setVizData(formattedData);
        }
    }

    const fgRef = useRef();
    const visualization = <ForceGraph2D
        ref={fgRef}
        width={width}
        height={height}
        cooldownTicks={50}
        nodeLabel={node => `<div>${generateTooltip(node)}</div>`}
        nodeCanvasObjectMode={() => "after"}
        onEngineStop={() => {
            if (firstRun) {
                fgRef.current.zoomToFit(200);
                setFirstRun(false);
            }
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 10;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(label, node.x, node.y + 1);


        }}
        graphData={vizData ? vizData : { nodes: [], links: [] }}
    />


    return <div style={{width: "100%", height: "100%"}} ref={observe}>
        {visualization}
    </div>
}