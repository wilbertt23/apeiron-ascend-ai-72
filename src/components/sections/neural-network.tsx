import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NeuralNetwork = () => {
  const [inputs, setInputs] = useState([0, 0, 0, 0, 0]);
  const [output, setOutput] = useState(0);
  const [decision, setDecision] = useState("No Decision");
  const [hiddenLayer, setHiddenLayer] = useState([0, 0, 0, 0, 0, 0]);

  // Simple activation function (sigmoid)
  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

  // Dynamic weight matrices with randomness for different outputs each time
  const generateRandomWeights = () => ({
    weights1: Array(6).fill(0).map(() => Array(5).fill(0).map(() => (Math.random() - 0.5) * 2)),
    weights2: Array(6).fill(0).map(() => (Math.random() - 0.5) * 2)
  });

  const calculateNetwork = () => {
    // Generate new random weights each time for different outputs
    const { weights1, weights2 } = generateRandomWeights();
    
    // Calculate hidden layer
    const hidden = weights1.map((nodeWeights, i) => {
      const sum = inputs.reduce((acc, input, j) => acc + input * nodeWeights[j], 0);
      return sigmoid(sum);
    });
    setHiddenLayer(hidden);

    // Calculate output layer and determine decision directly
    const outputSum = hidden.reduce((acc, hidden, j) => acc + hidden * weights2[j], 0);
    const outputValue = sigmoid(outputSum);
    
    // Convert output to decision with random element
    const decisions = ["Attack", "Retreat", "Defend", "Hold Position"];
    const randomFactor = Math.random() * 0.2; // Add some randomness
    const adjustedOutput = outputValue + randomFactor;
    
    let aiDecision = "Hold Position";
    if (adjustedOutput < 0.3) {
      aiDecision = "Retreat";
    } else if (adjustedOutput > 0.7) {
      aiDecision = "Attack";
    } else if (adjustedOutput > 0.5) {
      aiDecision = "Defend";
    }
    
    setOutput(outputValue);
    setDecision(aiDecision);
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = parseFloat(value) || 0;
    setInputs(newInputs);
  };

  const NetworkNode = ({ value, label, color = "blue" }: { value: number; label: string; color?: "blue" | "green" | "yellow" }) => {
    const colorClasses = {
      blue: "bg-blue-500 border-blue-600 text-white",
      green: "bg-green-500 border-green-600 text-white", 
      yellow: "bg-yellow-500 border-yellow-600 text-black"
    };
    
    return (
      <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 ${colorClasses[color]} shadow-lg mb-4`}>
        <div className="text-xs font-mono text-center">
          <div className="text-[9px] opacity-80">{label}</div>
          <div className="font-semibold text-[10px]">{value.toFixed(2)}</div>
        </div>
      </div>
    );
  };

  const SingleLine = () => (
    <div className="flex items-center justify-center mx-6">
      <div className="w-16 h-0.5 bg-gray-400"></div>
    </div>
  );

  const columns = [
    { label: "Input layer", nodes: inputs.map((v, i) => ({ value: v, label: ["X","Y","HP","EHP","MP"][i] })), color: "blue" as const },
    { label: "Hidden layer 1", nodes: hiddenLayer.slice(0,3).map((v, i) => ({ value: v, label: `H${i+1}` })), color: "green" as const },
    { label: "Hidden layer 2", nodes: hiddenLayer.slice(3,6).map((v, i) => ({ value: v, label: `H${i+4}` })), color: "green" as const },
    { label: "Output layer", nodes: [{ value: output, label: "Output" }], color: "yellow" as const },
  ];

  const xOf = (colIndex: number) => (colIndex / (columns.length - 1)) * 100;
  const yOf = (idx: number, total: number) => ((idx + 1) / (total + 1)) * 100;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-cyber-pink mb-4">Interactive Neural Network</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Input gaming state values and see how the AI makes strategic decisions through our neural network.
        </p>
      </div>

      {/* Input Controls */}
      <Card className="p-6 mb-8 bg-surface border border-border">
        <h3 className="text-xl font-semibold text-cyber-blue mb-4">Gaming State Inputs</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {inputs.map((input, index) => {
            const labels = ["Position X", "Position Y", "Health %", "Enemy Health %", "Mana (max 15)"];
            return (
              <div key={index}>
                <Label htmlFor={`input-${index}`} className="text-sm font-medium">
                  {labels[index]}
                </Label>
                <Input
                  id={`input-${index}`}
                  type="number"
                  step="0.1"
                  value={input}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="mt-1"
                  max={index === 4 ? 15 : undefined}
                />
              </div>
            );
          })}
        </div>
        <Button onClick={calculateNetwork} className="w-full">
          Calculate Network
        </Button>
      </Card>

      {/* Neural Network Visualization */}
      <Card className="p-8 bg-surface border border-border">
        <h3 className="text-xl font-semibold text-cyber-pink mb-6 text-center">Artificial Neural Networks</h3>
        
        <div className="relative w-full h-[420px]">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {columns.slice(0, -1).map((col, ci) => 
              col.nodes.map((_, i) => 
                columns[ci + 1].nodes.map((__, j) => {
                  const x1 = xOf(ci) + 8; // Offset to center of circle
                  const y1 = yOf(i, col.nodes.length);
                  const x2 = xOf(ci + 1) - 8; // Offset to center of circle
                  const y2 = yOf(j, columns[ci + 1].nodes.length);
                  
                  return (
                    <line
                      key={`${ci}-${i}-${j}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#64748b"
                      strokeWidth="0.2"
                      opacity="0.6"
                    />
                  );
                })
              )
            )}
          </svg>

          {/* Nodes */}
          {columns.map((col, ci) => (
            <div
              key={ci}
              className="absolute -translate-x-1/2"
              style={{ left: `${xOf(ci)}%`, top: 0, height: "100%", width: "120px" }}
            >
              <div className="text-center text-xs text-muted-foreground mb-2">{col.label}</div>
              {col.nodes.map((node, ni) => (
                <div
                  key={ni}
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{ top: `${yOf(ni, col.nodes.length)}%` }}
                >
                  <NetworkNode value={node.value} label={node.label} color={col.color} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Decision */}
        <div className="mt-6 flex justify-center">
          <div
            className={`px-4 py-2 rounded-lg border text-center font-semibold ${
              decision === "Attack"
                ? "bg-red-500/20 border-red-500 text-red-400"
                : decision === "Retreat"
                ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                : decision === "Defend"
                ? "bg-blue-500/20 border-blue-500 text-blue-400"
                : "bg-surface border-border text-muted-foreground"
            }`}
          >
            {decision}
          </div>
        </div>

        {/* Network Description */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="p-4 bg-surface border border-border">
            <h4 className="font-semibold text-cyber-pink mb-2">How It Works</h4>
            <p className="text-sm text-muted-foreground">
              Each neuron applies weights to its inputs, sums them up, and passes the result through an activation function (sigmoid). 
              The network learns by adjusting these weights during training.
            </p>
          </Card>
          
          <Card className="p-4 bg-surface border border-border">
            <h4 className="font-semibold text-cyber-blue mb-2">Gaming Application</h4>
            <p className="text-sm text-muted-foreground">
              The network analyzes game state (position, health, mana) to recommend the best action. 
              Higher confidence values indicate stronger recommendations.
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default NeuralNetwork;