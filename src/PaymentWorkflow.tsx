import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { Alert, Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import dagre from "dagre"; 
import PaymentProviderNode from "./components/NodeTypes/PaymentProviderNode";
import PaymentInitializationNode from "./components/NodeTypes/PaymentInitializationNode";
import CustomControls from "./components/Controls/CustomControls";
import useUndoRedo from "./hooks/useUndoRedo";
import CustomEdge from "./components/CustomEdge"; 

type PaymentNodeData = {
  label: string;
  amount?: number;
  flag?: string; 
  onDelete?: (id: string) => void;
};

const countries = [
  { name: "USA", flag: "US" },
  { name: "India", flag: "IN" },
  { name: "Germany", flag: "DE" },
  { name: "France", flag: "FR" },
];

const nodeTypes = {
  paymentProvider: PaymentProviderNode,
  paymentInitialization: PaymentInitializationNode,
};

const initialNodes: Node<PaymentNodeData>[] = [];
const initialEdges: Edge[] = [];

const PaymentWorkflow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [currentWorkflow, saveWorkflow, undo, redo] = useUndoRedo({
    nodes,
    edges,
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<
    "success" | "danger" | "info" | "warning"
  >("success");
  const [showAlert, setShowAlert] = useState(false);

  const availableCountries = countries.filter(
    (country) => !nodes.some((node) => node.data.label.includes(country.flag))
  );

  const handleAddPaymentInitNode = () => {
    if (selectedCountry) {
      const selectedCountryData = countries.find(
        (country) => country.name === selectedCountry
      );
      const newNode: Node<PaymentNodeData> = {
        id: uuidv4(),
        type: "paymentInitialization",
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: {
          label: `Payment Initialization - ${selectedCountry}`,
          amount: selectedAmount,
          flag: selectedCountryData?.flag,
          onDelete: handleDeleteNode,
        },
      };
      setNodes((nds) => nds.concat(newNode));
      saveWorkflow({ nodes: [...nodes, newNode], edges });
      setSelectedCountry("");
      setSelectedAmount(10);
      showAlertMessage("Payment Initialization node added successfully.", "success");
    } else {
      showAlertMessage("Please select a country.", "danger");
    }
  };

  const handleAddPaymentProviderNode = () => {
    if (selectedProvider) {
      const isDuplicate = nodes.some(
        (node) => node.data.label === selectedProvider
      );
      if (isDuplicate) {
        showAlertMessage("This payment provider already exists.", "danger");
        return;
      }

      const newNode: Node<PaymentNodeData> = {
        id: uuidv4(),
        type: "paymentProvider",
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: {
          label: selectedProvider,
          onDelete: handleDeleteNode,
        },
      };
      setNodes((nds) => nds.concat(newNode));
      saveWorkflow({ nodes: [...nodes, newNode], edges });
      setSelectedProvider("");
      showAlertMessage("Payment Provider node added successfully.", "success");
    } else {
      showAlertMessage("Please select a payment provider.", "danger");
    }
  };

  const handleDeleteNode = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    saveWorkflow({ nodes, edges });
    showAlertMessage("Node deleted successfully.", "warning");
  };

  const handleDeleteEdge = (edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    showAlertMessage("Connection deleted successfully.", "warning");
  };

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const edgeLabel = `Edge ${edges.length + 1}`; 
      const newEdge = addEdge({ ...params, data: { label: edgeLabel } }, edges); 
      setEdges(newEdge);
      saveWorkflow({ nodes, edges: newEdge });
      showAlertMessage("Connection created successfully.", "success");
    },
    [edges, saveWorkflow]
  );

  const handleAutoLayout = () => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: "TB", marginx: 50, marginy: 50 }); 

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: 150, height: 50 }); 
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const updatedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x,
          y: nodeWithPosition.y,
        },
      };
    });

    setNodes(updatedNodes);
    saveWorkflow({ nodes: updatedNodes, edges });
    showAlertMessage("Auto layout applied successfully.", "info");
  };

  const handleExport = () => {
    const data = { nodes, edges };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "workflow.json";
    link.click();
    showAlertMessage("Workflow exported successfully.", "success");
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const data = JSON.parse(fileReader.result as string);
      setNodes(data.nodes);
      setEdges(data.edges);
      saveWorkflow({ nodes: data.nodes, edges: data.edges });
      showAlertMessage("Workflow imported successfully.", "success");
    };
    if (event.target.files) {
      fileReader.readAsText(event.target.files[0]);
    }
  };

  const saveToLocalStorage = () => {
    const data = { nodes, edges };
    localStorage.setItem("workflow", JSON.stringify(data));
    showAlertMessage("Workflow saved to local storage.", "success");
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem("workflow");
    if (savedData) {
      const { nodes, edges } = JSON.parse(savedData);
      setNodes(nodes);
      setEdges(edges);
      saveWorkflow({ nodes, edges }); // Update history after loading
      showAlertMessage("Workflow loaded from local storage.", "success");
    } else {
      showAlertMessage("No saved workflow found.", "danger");
    }
  };

  const showAlertMessage = (
    message: string,
    variant: "success" | "danger" | "info" | "warning"
  ) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); 
  };

  return (
    <Container fluid style={{ height: "100vh" }}>
      <ReactFlowProvider>
        <Card
          className="p-4 mb-4"
          style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}
        >
          {showAlert && (
            <Alert
              variant={alertVariant}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="formBasicSelect">
                <Form.Label style={{ textAlign: "left", display: "block" }}>
                  <strong>Select Payment Provider</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                >
                  <option value="" disabled>
                    Select a payment provider
                  </option>
                  <option value="Google Pay">Google Pay</option>
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="Stripe">Stripe</option>
                  <option value="Phone Pay">Phone Pay</option>
                  <option value="Amazon Pay">Amazon Pay</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-end">
              <Button onClick={handleAddPaymentProviderNode} variant="primary">
                Add Payment Provider Node
              </Button>
            </Col>
          </Row>

          <Row className="mb-3 mt-3">
            <Col xs={12} lg={6}>
              <Form.Group controlId="formCountrySelect">
                <Form.Label style={{ textAlign: "left", display: "block" }}>
                  <strong>Select Country for Payment Initialization</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  {availableCountries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} lg={3}>
              <Form.Group controlId="formPaymentAmount">
                <Form.Label style={{ textAlign: "left", display: "block" }}>
                  <strong>Payment Amount</strong>
                </Form.Label>
                <Form.Control
                  type="number"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                  placeholder="Enter Payment Amount"
                />
              </Form.Group>
            </Col>
            <Col xs={12} lg={3} className="d-flex align-items-end">
              <Button onClick={handleAddPaymentInitNode} variant="success">
                Add Payment Initialization Node
              </Button>
            </Col>
          </Row>

          
          <Row>
            <Col className="d-flex align-items-end">
              <CustomControls
                onUndo={undo}
                onRedo={redo}
                onExport={handleExport}
                onImport={handleImport}
              />
            </Col>
          </Row>

          <Row className="mb-3 mt-5">
            <Col xs={12} lg={4} className="d-flex align-items-end mb-3">
              <Button onClick={handleAutoLayout} variant="info">
                Auto Layout
              </Button>
            </Col>
            <Col xs={12} lg={4} className="d-flex align-items-end mb-3">
              <Button onClick={saveToLocalStorage} variant="warning">
                Save to Local Storage
              </Button>
            </Col>
            <Col xs={12} lg={4} className="d-flex align-items-end mb-3">
              <Button onClick={loadFromLocalStorage} variant="info">
                Load from Local Storage
              </Button>
            </Col>
          </Row>
        </Card>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={{
            custom: (edgeProps) => (
              <CustomEdge {...edgeProps} onDelete={handleDeleteEdge} />
            ),
          }} 
          className="mb-5"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </Container>
  );
};

export default PaymentWorkflow;
