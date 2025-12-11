# 🛠️ My AWS Patch Manager Walkthrough

This README documents how I set up and ran patching operations in AWS using **Systems Manager Patch Manager**.  
I’ve written it in the first person to show exactly what I did and how I did it.

---

## Prerequisites and Context

Before I started, I made sure I had:

- **AWS account and permissions**: Access to Systems Manager, EC2, IAM, and AWS Organizations (for cross‑account patching).  
- **SSM Agent and IAM role**: My EC2 instances were running the SSM Agent and attached to an IAM role with Systems Manager permissions (e.g., `RoleForSSM`). The instances showed up as **Online** in Systems Manager with a **Running** node state.  
- **Operating systems**: I worked with both Windows Server and Linux. Instance metadata looked like:  
  - Platform type: Linux or Windows  
  - Resource type: EC2 instance  
  - Ping status: Online  
  - Image ID: e.g., `ami-00c1d63aff2d420ad`  
- **Region selection**: I always worked in the same region where my instances were running.  

💡 *Tip*: If I didn’t see my instance under Fleet Manager or Patch Manager, I verified the SSM Agent was installed, the IAM role was correct, and the instance had outbound internet/NAT access to reach SSM endpoints.

---

## Tagging Instances into Patch Groups

Patch Manager targets instances using the tag key **`Patch Group`**. I used values like `WindowsProd` or `LinuxProd` to group environments.

Steps I followed:
1. Opened the EC2 console and selected the instance I wanted to patch.  
2. Added tags:  
   - Key: `Patch Group`  
   - Value: `WindowsProd` (for Windows servers)  
   - Optional: Added `Name` and lab identifiers like `cloudlab`.  
3. Saved the tags and confirmed they appeared on the instance.  

![1](Screenshot%202025-11-24%20121713.png)

💡 *Tip*: I kept patch groups environment‑specific (`WindowsProd`, `WindowsTest`, `LinuxProd`) so I could roll out patches safely.

---

## Creating a Custom Patch Baseline (Windows Example)

A patch baseline defines which patches are approved and when. I created one tailored to my compliance policy.

Steps:
- Went to **Systems Manager → Patch Manager → Patch baselines → Create patch baseline**.  
- Entered details:  
  - Name: `WindowsServerSecurityUpdates`  
  - Description: Windows security baseline patch  
  - Operating system: Windows  
  - Compliance status: Noncompliant (so unapproved fixes still showed up in reports).  

![2](Screenshot%202025-11-24%20122824.png)

Rules I added:

- **Rule 1 (Critical security updates)**  
  ![3](Screenshot%202025-11-24%20122843.png)

- **Rule 2 (Important security updates)**  
  ![4](Screenshot%202025-11-24%20122946.png)

---

## Associating Patch Groups with the Baseline

I linked my baseline to patch groups so Patch Manager knew which instances it applied to.

- Opened **Patch baselines**, selected `WindowsServerSecurityUpdates`.  
- Chose **Actions → Modify patch groups**.  
- Added patch group values like `WindowsProd`.  
- Saved changes and verified the group appeared under “Patch groups.”  

![5](Screenshot%202025-11-24%20123006.png)

💡 *Tip*: AWS allows up to 25 tag values per baseline. I kept naming consistent across accounts and regions.

---

## Setting the Default Patch Baseline (Optional)

To simplify operations, I set my custom baseline as the default for Windows:

![6](Screenshot%202025-11-24%20124414.png)

I still kept AWS defaults like `AWS-DefaultPatchBaseline` for reference.  
When I had multiple baselines (Prod vs Test), I preferred targeting by patch group instead of setting a single default.

---

## Targeting Instances by Tag for Patch Operations

Before patching, I confirmed target selection was tag‑based:

![7](Screenshot%202025-11-24%20124616.png)

I added:
- Tag key: `Patch Group`  
- Tag value: `WindowsProd` (or `LinuxProd`).  
- Verified targets were recognized.

---

## Running a Patch: Scan and Install, with Reboot Control

For ad‑hoc patching, I used **Patch now**. Later, I automated with Maintenance Windows.

Steps:
- Went to **Patch Manager → Patch now**.  
- Chose operation:  
  - **Scan** (to see missing patches), or  
  - **Scan and install** (to apply approved patches).  
- Set reboot option:  
  - Reboot if needed (default for Windows), or  
  - Do not reboot (when coordinating with app owners), or  
  - Schedule a reboot time.  
- Selected **Patch only the target instances I specify**.  
- Clicked **Patch now** to start.

![8](Screenshot%202025-11-24%20124632.png)

---

## Verifying Compliance and Outcomes

After patching, I validated compliance:

- Checked **Compliance dashboard** for counts like “Patch installed,” “Patch missing,” and overall status.  
- In **Instance details**, confirmed association status was “Success” and ping was “Online.”  
- Reports showed unapproved security updates as “Noncompliant,” just as expected.  

💡 *Tip*: If compliance was off, I re‑checked tags, baseline associations, OS alignment, and SSM Agent health. For Windows, I also checked Windows Update logs.

---

## Troubleshooting Checklist

Here’s how I solved common issues:

- **Instance not targeted** → Verified `Patch Group` tag matched the baseline’s patch groups.  
- **Instance “Offline”** → Checked SSM Agent, IAM role (`RoleForSSM`), and VPC endpoints/NAT.  
- **No patches installed** → Confirmed baseline approved the right products/classifications (e.g., WindowsServer2019).  
- **Reboots not happening** → Checked if “Do not reboot” was set.  
- **Baseline not applied** → Made sure patch groups were modified on the specific baseline and set as default if needed.  

---

## Quick Reference: My Configuration

- **Tags**: `Patch Group = WindowsProd` (and `LinuxProd` for Linux)  
- **Custom baseline**: `WindowsServerSecurityUpdates` (Critical + Important updates, auto‑approve after 3 days)  
- **Patch groups linked**: `WindowsProd`  
- **Action flow**: Patch now → Specify instance tags → Scan or Scan and install → Reboot options → Patch only target instances → Patch now  
- **Verification**: Compliance dashboard showed installed/missing/noncompliant counts per instance  

---
