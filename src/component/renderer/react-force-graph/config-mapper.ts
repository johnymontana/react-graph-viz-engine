const NODE_SIZE_MULTIPLIER = 0.2;

/**
 * For react-force-graph, assign styling properties directly to the elements to draw.
 */
export function mapConfig(config: object, elements: Array<object>) {
    elements['nodes'] = elements['nodes'].map(node => {
        const nodeColor = config && config['nodeColor'] && config['nodeColor'][node.label] ? config['nodeColor'][node.label] : "#aaa";
        const nodeSize = config && config['nodeSize'] && config['nodeSize'][node.label] ? config['nodeSize'][node.label] * NODE_SIZE_MULTIPLIER : 4;
        return { ...node, color: nodeColor, size: nodeSize }
    });
    return elements;
}