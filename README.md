# Intro
This was a problem in a hw I had from computer networks.
This is just a basic implementation of dijkstra's algorithm.
I took a really long time since I wasn't aware of how I was creating objects and 
so I was confused on if changing one object's member would change it in another location that I had put it.
A example of a problem that came up was that I was comparing the *connection.dist* value thinking that I had changed
it but it was always going to be *Infinity* as I created copies of a node using *new*.

# Basic Usage
Type in a Node's name in the "node name" input box.
Create an edge by typing in two nodes' names and its weight.
You can drag and drop nodes to reposition them. Don't move the mouse too fast as it was lose focus on which node you are dragging.
Start the dijkstra's algorithm by typing in the starting node and click the button.  The paths will be shown in the textarea box.
