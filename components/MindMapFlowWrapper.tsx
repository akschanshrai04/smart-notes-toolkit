import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState,
  MarkerType,
  useReactFlow,
  Node,
  Edge,
  NodeTypes,
  NodeProps,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Handle, Position } from 'reactflow';

// Extended to handle any JSON format
type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

// Props type for the MindMapNode component
interface MindMapNodeData {
  label: string;
  description?: string;
  depth?: number;
}

// Custom Node Component
const MindMapNode: React.FC<NodeProps<MindMapNodeData>> = ({ data }) => {
  // Color gradient based on node depth
  const getNodeColor = (depth = 0) => {
    const colors = ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8'];
    return colors[Math.min(depth, colors.length - 1)];
  };

  return (
    <div 
      className="px-4 py-2 rounded-lg shadow-md border border-gray-200 min-w-40 text-center"
      style={{ backgroundColor: getNodeColor(data.depth) }}
    >
      <div className="font-medium">{data.label}</div>
      {data.description && (
        <div className="text-sm text-gray-500 mt-1">{data.description}</div>
      )}
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

// Props type for the MindMapGraph component
interface MindMapGraphProps {
  jsonData?: any;
  width?: string;
  height?: string;
}

// Main Component
const MindMapGraph: React.FC<MindMapGraphProps> = ({ 
  jsonData, 
  width = '100%', 
  height = '600px' 
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<MindMapNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [data, setData] = useState<any>(jsonData);
  const { fitView } = useReactFlow();

  // Process file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result;
          if (typeof result === 'string') {
            const json = JSON.parse(result);
            setData(json);
          }
        } catch (error) {
          console.error('Error parsing JSON file:', error);
          alert('Invalid JSON file. Please try again.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Convert any JSON structure to a normalized format for visualization
  const normalizeJson = useCallback((data: any): JsonObject => {
    if (data === null || typeof data !== 'object') {
      return { "Value": data?.toString() || "null" };
    }
    
    if (Array.isArray(data)) {
      const result: JsonObject = {};
      data.forEach((item, index) => {
        result[`Item ${index}`] = normalizeJson(item);
      });
      return result;
    }
    
    return data;
  }, []);

  // Advanced layout algorithm with collision detection
  const createLayout = useCallback((
    obj: any,
    parentId: string | null = null,
    level: number = 0,
    horizontalOffset: number = 0,
    depth: number = 0
  ): { 
    nodes: Node<MindMapNodeData>[]; 
    edges: Edge[];
    width: number;
  } => {
    let nodes: Node<MindMapNodeData>[] = [];
    let edges: Edge[] = [];
    let normalizedObj: JsonObject;
    
    // Normalize input to handle any JSON structure
    if (level === 0) {
      normalizedObj = normalizeJson(obj);
    } else {
      normalizedObj = typeof obj === 'object' && obj !== null ? 
        (Array.isArray(obj) ? normalizeJson(obj) : obj) : 
        { "Value": obj?.toString() || "null" };
    }

    // If the object is empty at the first level, create a placeholder
    if (level === 0 && Object.keys(normalizedObj).length === 0) {
      normalizedObj = { "Empty Data": {} };
    }
    
    // Process root node at level 0
    if (level === 0) {
      const rootKey = Object.keys(normalizedObj)[0];
      const rootId = 'root';
      const rootNode: Node<MindMapNodeData> = {
        id: rootId,
        type: 'mindMapNode',
        data: { label: rootKey, depth: 0 },
        position: { x: 0, y: 0 },
      };
      nodes.push(rootNode);
      
      // Process children of the root
      const rootValue = normalizedObj[rootKey];
      const childResults = createLayout(rootValue, rootId, level + 1, 0, depth + 1);
      
      // Combine results
      nodes = [...nodes, ...childResults.nodes];
      edges = [...edges, ...childResults.edges];
      
      return { nodes, edges, width: childResults.width };
    }
    
    // Setup for spacing calculations
    const nodeWidth = 180;  // Estimated width of a node
    const nodeHeight = 80;  // Estimated height of a node
    const horizontalSpacing = 40;  // Minimum horizontal space between nodes
    const verticalSpacing = 80;    // Vertical space between levels
    
    const keys = Object.keys(normalizedObj);
    let totalWidth = 0;
    let childLayouts: { nodes: Node<MindMapNodeData>[]; edges: Edge[]; width: number; }[] = [];
    
    // First pass: process all children to calculate total width
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const childValue = normalizedObj[key];
      
      // Process child layout first to determine its width
      const hasChildren = typeof childValue === 'object' && childValue !== null && Object.keys(childValue).length > 0;
      let childLayout = { nodes: [], edges: [], width: nodeWidth } as { nodes: Node<MindMapNodeData>[]; edges: Edge[]; width: number; };
      
      if (hasChildren) {
        childLayout = createLayout(childValue, `${parentId}-${key}`, level + 1, 0, depth + 1);
      }
      
      childLayouts.push(childLayout);
      totalWidth += Math.max(nodeWidth, childLayout.width);
      
      // Add spacing between siblings
      if (i < keys.length - 1) {
        totalWidth += horizontalSpacing;
      }
    }
    
    // Second pass: position nodes with calculated offsets
    let currentOffset = horizontalOffset - totalWidth / 2;
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const childValue = normalizedObj[key];
      const childLayout = childLayouts[i];
      const nodeId = `${parentId}-${key}`;
      
      // Determine horizontal position
      const childWidth = Math.max(nodeWidth, childLayout.width);
      const centerX = currentOffset + childWidth / 2;
      
      // Create node at this level
      const node: Node<MindMapNodeData> = {
        id: nodeId,
        type: 'mindMapNode',
        data: { 
          label: key, 
          description: typeof childValue !== 'object' ? childValue?.toString() : undefined,
          depth 
        },
        position: { x: centerX, y: level * (nodeHeight + verticalSpacing) },
      };
      
      nodes.push(node);
      
      // Create edge from parent to this node
      if (parentId) {
        edges.push({
          id: `e-${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { strokeWidth: 2 }
        });
      }
      
      // Add child nodes and edges
      nodes = [...nodes, ...childLayout.nodes];
      edges = [...edges, ...childLayout.edges];
      
      // Update offset for next sibling
      currentOffset += childWidth + horizontalSpacing;
    }
    
    return { nodes, edges, width: totalWidth };
  }, [normalizeJson]);

  // Update nodes and edges when data changes
  useEffect(() => {
    if (data) {
      const { nodes: layoutNodes, edges: layoutEdges } = createLayout(data);
      setNodes(layoutNodes);
      setEdges(layoutEdges);
      
      // Use setTimeout to ensure the flow is rendered before fitting the view
      setTimeout(() => {
        fitView({ padding: 0.2 });
      }, 100);
    }
  }, [data, createLayout, setNodes, setEdges, fitView]);

  // Node types for custom rendering
  const nodeTypes: NodeTypes = {
    mindMapNode: MindMapNode
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-4">
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div style={{ width, height }} className="border border-gray-300 rounded">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          attributionPosition="bottom-right"
        >
          <Background color="#f8fafc" gap={16} />
          <Controls />
          <MiniMap 
            nodeStrokeColor="#aaa"
            nodeColor={(node) => {
              const depth = (node.data as MindMapNodeData).depth || 0;
              const colors = ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8'];
              return colors[Math.min(depth, colors.length - 1)];
            }}
            nodeBorderRadius={8}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

// Wrapper component props
interface MindMapFlowWrapperProps extends MindMapGraphProps {}

// Wrapper component that provides ReactFlowProvider
const MindMapFlowWrapper: React.FC<MindMapFlowWrapperProps> = (props) => {
  return (
    <ReactFlowProvider>
      <MindMapGraph {...props} />
    </ReactFlowProvider>
  );
};

export default MindMapFlowWrapper;