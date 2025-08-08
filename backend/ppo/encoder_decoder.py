import torch as T
import torch.nn as nn
import torch.optim as optim
import numpy as np
import math
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

def visualize_colours(rgb1, rgb2, rgb3, save_path='player_colours.png'):
    fig, axs = plt.subplots(1, 4, figsize=(12, 3), facecolor='white')
    fig.patch.set_facecolor('white')
    
    # Convert tensors to numpy arrays and normalize to [0,1]
    def prepare_colour(rgb):
        if T.is_tensor(rgb):
            rgb = rgb.detach().cpu().numpy()
        rgb = np.array(rgb)
        return rgb/255 if rgb.max() > 1 else rgb
    
    # Process colours
    rgb1 = prepare_colour(rgb1)
    rgb2 = prepare_colour(rgb2)
    rgb3 = prepare_colour(rgb3)

    # Plot the rectangles in a horizontal strip
    plt.subplots_adjust(wspace=0) 
    for i, ax in enumerate(axs):
        ax.set_xlim(0, 1)
        ax.set_ylim(0, 1)
        colour = rgb1 if i < 2 else rgb2 if i == 2 else rgb3
        rect = Rectangle((0, 0), 1, 1, facecolor=colour, edgecolor=None)
        ax.add_patch(rect)
        ax.axis('off')
    

    plt.savefig(save_path, bbox_inches='tight', dpi=100, facecolor='white', pad_inches=5)
    print(f"\nColour visualization saved to: {save_path}")

class EncoderDecoder(nn.Module):
    def __init__(self, input_size, n_inputs, d_model, n_colours=3):
        super(EncoderDecoder, self).__init__()
        self.input_size = input_size
        self.n_inputs = n_inputs
        self.n_colours = n_colours

        self.character_embedding = nn.Embedding(input_size, d_model)
        self.positional_embedding = nn.Embedding(n_inputs, d_model)

        self.encoder = nn.TransformerEncoder(
            nn.TransformerEncoderLayer(d_model=d_model, nhead=8),
            num_layers=3
        )

        self.decoder = nn.TransformerDecoder(
            nn.TransformerDecoderLayer(d_model=d_model, nhead=8),
            num_layers=3
        )

        self.output_layer = nn.Linear(d_model, n_colours*3)
        self.value_head = nn.Linear(d_model, 1)

        self.log_std = nn.Parameter(T.zeros(n_colours * 3))

    def clean_input(self, x):
        # round all float values to an order of the input_size (10, 100, 1000, etc.)
        x = T.tensor(x, dtype=T.float32)
        x = T.round(x * self.input_size) / self.input_size
        return x

    def forward(self, x):
        x = self.clean_input(x)
        batch_size, n_inputs = x.shape

        pos_indices = T.arange(0, n_inputs, dtype=T.long).unsqueeze(0).repeat(batch_size, 1)

        # Embed characters and positions
        char_embedded = self.character_embedding(x.long())
        pos_embedded = self.positional_embedding(pos_indices)

        # Combine embeddings
        embedded = char_embedded + pos_embedded

        # Pass through encoder
        encoder_output = self.encoder(embedded.permute(1, 0, 2))

        # Pass through decoder
        decoder_output = self.decoder(encoder_output, encoder_output)

        # Output layer
        output = self.output_layer(decoder_output.permute(1, 0, 2))
        output = output.reshape(batch_size, n_inputs, self.n_colours * 3)
        mu = T.sigmoid(output[:,0,:])

        enc_feat = encoder_output.permute(1,0,2).mean(1)
        value = self.value_head(enc_feat)

        std = T.exp(self.log_std)

        return mu, std, value 
    
    def get_dist(self, x):
        mu, std, value = self.forward(x)
        dist = T.distributions.Normal(mu, std)
        return dist, value

# Example usage
if __name__ == "__main__":
    input_size = 1000  # Example input size
    n_inputs = 5       # Number of player attributes (aggression, survivability, defense, skill usage, minion usage)
    d_model = 128      # Dimension of the model

    model = EncoderDecoder(input_size, n_inputs, d_model)

    # Example player stats: [aggression, survivability, defense, skill_usage, minion_usage]
    player_stats = np.random.rand(1, n_inputs)  # One player's stats
    print("Player stats:", player_stats[0])  # Show the stats without the batch dimension
    output = model(player_stats)
    
    # Extract and normalize the three RGB colors
    def normalize_rgb(tensor):
        # Apply sigmoid to ensure values are between 0 and 1
        normalized = T.sigmoid(tensor)
        # Scale to [0, 255] and round to integers
        return (normalized * 255).round().int()

    # Take only the first input's output as it contains all our player's RGB values
    rgb1 = normalize_rgb(output[:,0,0:3])  # First RGB colour
    rgb2 = normalize_rgb(output[:,0,3:6])  # Second RGB colour
    rgb3 = normalize_rgb(output[:,0,6:9])  # Third RGB colour
    
    # Visualize the colours and save to file
    visualize_colours(rgb1[0], rgb2[0], rgb3[0], 'player_colours.png')
        


        