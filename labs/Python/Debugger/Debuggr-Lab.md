
#  Python Debugger Walkthrough

This README demonstrates how I use the Python debugger in a beginner‑friendly IDE environment.  
My goal is to help you understand how breakpoints, watch expressions, and step execution work in a live debugging session.

---

## Script Overview

The script I’m debugging is `Debugger.py`, which contains:

```python
name = "John"
print("Hello " + name + ".")
age = 40
print(name + " is " + str(age) + " years old.")
```

---

## Step‑by‑Step Debugging Instructions

### 1. Open the Debugger Panel
On the right‑hand side of the IDE, I locate and click the **Debugger** tab to open the debugging interface.

### 2. Set Breakpoints
I click the gutter (the space to the left of the line numbers) beside:
- Line 1: `name = "John"`
- Line 4: `print(name + " is " + str(age) + " years old.")`

This sets breakpoints that pause execution at these lines.

### 3. Add Watch Expressions
In the Debugger window, I go to the **Watch Expressions** section.  
I add two expressions to monitor:
- `name`
- `age`

These display the current values of the variables as the program runs.

### 4. Run the Program
I click the **Run** button to execute the script normally.  
This opens a Runner tab and prints the output:

```
Hello John.
John is 40 years old.
```

### 5. Run in Debug Mode
On the Runner tab, I click **Run in Debug Mode** to start a debug session.

### 6. Observe Breakpoint Behavior
The program pauses at the first breakpoint (line 1).  
I see the debugger highlight the line and show the current state of variables.

### 7. Step Over Execution
I click the **Step Over** icon (usually a curved arrow) at the top of the Debugger window.  
This executes line 1 and updates the `name` variable in the Local Variables section.

### 8. Resume to Next Breakpoint
I click the blue arrow (**Continue/Resume**) to proceed.  
The debugger pauses again at line 4, where the second breakpoint is set.  
The `age` variable is now visible and updated.

### 9. Final Resume
I click the blue arrow again to finish execution.  
The final output is printed, and the process exits with code `0`, indicating success.

---

## Debugging Outcome

By following these steps, I gain hands‑on experience with:

- Setting and using breakpoints  
- Watching variable values in real time  
- Controlling execution flow with step and resume actions  
  
