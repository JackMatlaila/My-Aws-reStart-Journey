
# 🔐 My IAM Security and Group Management Walkthrough

I want to share how I strengthened IAM security in my AWS account and organized users into the right groups.  
Here’s exactly what I did and how I did it.

---

## Prerequisites

I had administrator access to IAM in a single AWS account.  
The account already had pre-created IAM users and groups like `S3-Support` and `EC2-Support`.  
My goal was to enforce stronger passwords, verify group policies, and make sure users were assigned to groups that matched their job functions.

---

## Step 1: Creating and Applying a Secure IAM Password Policy

I started by opening the IAM console and going to:

IAM > Account settings > Password policy

Code

I chose **Custom** mode instead of the default IAM policy.  
Then I set the following rules:

- Minimum length: 10 characters  
- Complexity: uppercase, lowercase, numbers, and symbols (like `! @ # $ % ^ & *`)  
- Rotation: passwords expire every 90 days  
- Reuse prevention: remember the last 5 passwords  
- Self-service: users can change their own passwords  

After saving, I confirmed the policy was active with all the controls I wanted.

![1](Screenshot%202025-11-24%20155333.png)

---

## Step 2: Exploring Pre-Created IAM Users and Groups

Next, I reviewed the existing identities.  
Under **IAM > Users**, I looked at usernames, creation times, and last activity.  
Under **IAM > User groups**, I checked the groups like `S3-Support` and `EC2-Support` and their attached policies.  

I mapped which users should belong to which groups based on their roles — for example, S3 read-only access versus EC2 support duties.


---

## Step 3: Inspecting IAM Policies Attached to User Groups

I wanted to make sure each group had the right permissions.  
Here’s what I found and applied:

### EC2 Admin Support Policy
I created a policy that allowed viewing and controlled start/stop actions for EC2 instances:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:Describe*",
        "ec2:StartInstances",
        "ec2:StopInstances"
      ],
      "Resource": ["*"],
      "Effect": "Allow"
    }
  ]
}
```

Amazon EC2 Read-Only Access
I attached a policy that let users view EC2, ELB, and CloudWatch metrics without modification:


```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "ec2:GetSecurityGroupsForVpc"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "elasticloadbalancing:Describe*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudwatch:ListMetrics",
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:DescribeAlarms"
      ],
      "Resource": "*"
    }
  ]
}
```

Amazon S3 Read-Only Access
For S3, I attached a policy that allowed reading and listing buckets and objects:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*",
        "s3:Describe*",
        "s3-object-lambda:Get*",
        "s3-object-lambda:List*"
      ],
      "Resource": "*"
    }
  ]
}
```

I made sure groups only had what they needed — combining read-only access with narrowly scoped admin actions when required.

---

Step 4: Adding Users to Groups with the Right Capabilities
Once the policies were in place, I added users to the right groups. I opened the target group under:

Code
IAM > User groups > Select group (e.g., S3-Support, EC2-Support)
I searched for the intended users, checked them, and added them to the group. After that, I confirmed the group details listed the selected users.

![2](Screenshot%202025-11-24%20160123.png)

![3](Screenshot%202025-11-24%20160214.png)

---

### For example:

In S3-Support, I attached AmazonS3ReadOnlyAccess and added users who needed to view buckets/objects.

In EC2-Support, I attached AmazonEC2ReadOnlyAccess for monitoring, or EC2-Admin-Policy for controlled start/stop duties.

I also documented who was added, by whom, when, and why.

---

### Validation Checklist
After finishing, I validated everything:

Password policy: 10-character minimum, complexity enabled, 90-day expiry, last 5 reuse prevention, self-change allowed

Group policies: Read-only access for S3/EC2 groups; admin actions limited to EC2 operations

User membership: Each user was in the correct group with no overlapping privileges

Access testing: Users could sign in, list resources, and perform only the intended actions

---

# Operational Tips
***Here’s how I kept things clean and secure:***

I started with least privilege — read-only first, then added scoped actions as needed.

I used tags and conditions to restrict EC2 admin actions to tagged resources.

I set a quarterly review cadence for users, groups, and policies.

I automated onboarding and offboarding with a checklist to avoid drift.
