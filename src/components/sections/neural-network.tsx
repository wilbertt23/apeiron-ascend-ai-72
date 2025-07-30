import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NeuralNetwork = () => {
  const [inputs, setInputs] = useState([0, 0, 0, 0, 0]);
  const [output, setOutput] = useState(0);
  const [decision, setDecision] = useState("No Decision");
  const [hiddenLayer1, setHiddenLayer1] = useState([0, 0, 0, 0]);
  const [hiddenLayer2, setHiddenLayer2] = useState([0, 0, 0, 0]);

  // Simple activation function (sigmoid)
  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

  // Dynamic weight matrices with randomness for different outputs each time
  const generateRandomWeights = () => ({
    weights1: Array(4).fill(0).map(() => Array(5).fill(0).map(() => (Math.random() - 0.5) * 2)),
    weights2: Array(4).fill(0).map(() => Array(4).fill(0).map(() => (Math.random() - 0.5) * 2)),
    weights3: Array(4).fill(0).map(() => (Math.random() - 0.5) * 2)
  });

  const calculateNetwork = () => {
    // Generate new random weights each time for different outputs
    const { weights1, weights2, weights3 } = generateRandomWeights();
    
    // Calculate hidden layer 1
    const hidden1 = weights1.map((nodeWeights, i) => {
      const sum = inputs.reduce((acc, input, j) => acc + input * nodeWeights[j], 0);
      return sigmoid(sum);
    });
    setHiddenLayer1(hidden1);

    // Calculate hidden layer 2
    const hidden2 = weights2.map((nodeWeights, i) => {
      const sum = hidden1.reduce((acc, hidden, j) => acc + hidden * nodeWeights[j], 0);
      return sigmoid(sum);
    });
    setHiddenLayer2(hidden2);

    // Calculate output layer and determine decision directly
    const outputSum = hidden2.reduce((acc, hidden, j) => acc + hidden * weights3[j], 0);
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

  const NetworkNode = ({ value, label, isActive }: { value: number; label: string; isActive: boolean }) => (
    <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-300 ${
      isActive ? 'bg-cyber-blue/20 border-cyber-blue' : 'bg-surface border-border'
    }`}>
      <div className="text-xs font-mono text-center">
        <div className="text-[10px] text-muted-foreground">{label}</div>
        <div className="font-semibold">{value.toFixed(2)}</div>
      </div>
    </div>
  );

  const ConnectionLine = ({ fromCount, toCount, offset = 0 }: { fromCount: number; toCount: number; offset?: number }) => (
    <div className="relative mx-4">
      <svg width="80" height="200" className="absolute top-0 left-0">
        {Array.from({ length: fromCount }, (_, fromIndex) => 
          Array.from({ length: toCount }, (_, toIndex) => {
            const fromY = 32 + (fromIndex * 48) + offset;
            const toY = 32 + (toIndex * 48) + offset;
            return (
              <line
                key={`${fromIndex}-${toIndex}`}
                x1="16"
                y1={fromY}
                x2="64"
                y2={toY}
                stroke="hsl(var(--cyber-blue))"
                strokeWidth="1"
                strokeOpacity="0.4"
                className="transition-all duration-300"
              />
            );
          })
        )}
      </svg>
    </div>
  );

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
        <h3 className="text-xl font-semibold text-cyber-pink mb-6 text-center">AI Decision Network</h3>
        
        <div className="flex items-center justify-center space-x-8 overflow-x-auto min-w-max">
          {/* Input Layer */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium text-cyber-blue mb-4">Game State</h4>
            <div className="space-y-4">
              {inputs.map((input, index) => {
                const labels = ["X", "Y", "HP", "EHP", "MP"];
                return (
                  <NetworkNode
                    key={index}
                    value={input}
                    label={labels[index]}
                    isActive={input !== 0}
                  />
                );
              })}
            </div>
          </div>

          <ConnectionLine fromCount={5} toCount={4} />

          {/* Hidden Layer 1 */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium text-cyber-blue mb-4">Hidden Layer 1</h4>
            <div className="space-y-4">
              {hiddenLayer1.map((hidden, index) => (
                <NetworkNode
                  key={index}
                  value={hidden}
                  label={`H1${index + 1}`}
                  isActive={hidden > 0.5}
                />
              ))}
            </div>
          </div>

          <ConnectionLine fromCount={4} toCount={4} />

          {/* Hidden Layer 2 */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium text-cyber-blue mb-4">Hidden Layer 2</h4>
            <div className="space-y-4">
              {hiddenLayer2.map((hidden, index) => (
                <NetworkNode
                  key={index}
                  value={hidden}
                  label={`H2${index + 1}`}
                  isActive={hidden > 0.5}
                />
              ))}
            </div>
          </div>

          <ConnectionLine fromCount={4} toCount={1} />

          {/* Output Layer */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium text-cyber-blue mb-4">AI Decision</h4>
            <div className="flex flex-col items-center space-y-2">
              <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 transition-all duration-300 ${
                output > 0.5 ? 'bg-cyber-blue/20 border-cyber-blue' : 'bg-surface border-border'
              }`}>
                <div className="text-xs font-mono text-center">
                  <div className="text-[10px] text-muted-foreground">Output</div>
                  <div className="font-semibold">{output.toFixed(2)}</div>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg border text-center font-semibold ${
                decision === "Attack" ? "bg-red-500/20 border-red-500 text-red-400" :
                decision === "Retreat" ? "bg-yellow-500/20 border-yellow-500 text-yellow-400" :
                decision === "Defend" ? "bg-blue-500/20 border-blue-500 text-blue-400" :
                "bg-surface border-border text-muted-foreground"
              }`}>
                {decision}
              </div>
            </div>
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