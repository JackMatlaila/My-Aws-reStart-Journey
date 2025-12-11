
# AWS EBS Volume Lifecycle Demo

I documented exactly what I did to manage Amazon Elastic Block Store (EBS) volumes on EC2. If you’re learning AWS or building repeatable infrastructure, this is my step-by-step walkthrough of how I created a volume, attached and mounted it, took a snapshot, and restored a new volume from that snapshot. I included both AWS Console actions and terminal commands so it’s beginner-friendly and fully reproducible.

---

## Prerequisites

Before I started, I made sure I had:

- An active AWS account  
- A running EC2 instance (I used Amazon Linux)  
- IAM permissions to manage EC2 and EBS resources  
- Basic familiarity with the AWS Console and Linux terminal  

---

## Create an EBS Volume

Here’s how I created the volume in the AWS Console:

- I navigated to **EC2 > Elastic Block Store > Volumes**  
- I clicked **Create Volume**  
- I chose:  
  - **Volume type:** General Purpose SSD (gp3)  
  - **Size:** 1 GiB  
  - **IOPS:** 3000  
  - **Throughput:** 125 MiB/s  
  - **Availability Zone:** I matched my EC2 instance (e.g., `us-west-2a`)  

![001](Screenshot%202025-11-25%20190819.png)

- I optionally added a tag: `Name = My Volume`  
- I clicked **Create Volume**  

   ![002](Screenshot%202025-11-25%20190833.png)



> Tip: I used gp3 so I could customize performance independently of size.

---

## Attach and Mount the Volume to EC2

In the AWS Console:

- I went to **Volumes**, selected my volume  
- I clicked **Actions > Attach Volume**  
- I chose my EC2 instance  
- I set the **Device name** to `/dev/sdc`  
- I clicked **Attach Volume**  
  
  ![003](Screenshot%202025-11-25%20191047.png)

In my EC2 terminal, I prepared, formatted, and mounted the device:


# Create a mount point
sudo mkdir /mnt/data-store

![004](Screenshot%202025-11-25%20192956.png)

# Format the volume (ext3 used here)
sudo mkfs -t ext3 /dev/sdc

# Mount the volume
sudo mount /dev/sdc /mnt/data-store

# Write and verify a file
sudo sh -c "echo some text has been written > /mnt/data-store/file.txt"
cat /mnt/data-store/file.txt


I confirmed the output and saw: `some text has been written`.

---

## Create a Snapshot of the Volume

In the AWS Console:

- I went to **Volumes**, selected my volume  
- I clicked **Actions > Create Snapshot**  
- I added a description: `My Snapshot`  
- I optionally tagged it: `Name = My Snapshot`  
- I clicked **Create Snapshot**  

![006](Screenshot%202025-11-25%20192146.png)

> Snapshots are stored in S3 and can be used for backup or replication.

---

## Create a New Volume from Snapshot

In the AWS Console:

- I went to **Snapshots**, selected my snapshot  
- I clicked **Actions > Create Volume**  
- I chose:  
  - **Volume type:** gp3  
  - **Size:** 1 GiB  
  - **IOPS:** 3000  
  - **Throughput:** 125 MiB/s  
  - **Availability Zone:** I matched my EC2 instance  
- I tagged it: `Name = Restored Volume`  
- I clicked **Create Volume**  

![007](Screenshot%202025-11-25%20192714.png)

![008](Screenshot%202025-11-25%20192729.png)

Then I attached and mounted the restored volume to verify the data:

- I attached the restored volume to my EC2 instance with device name `/dev/sdc`  
- I mounted it to a new directory:

![009](Screenshot%202025-11-25%20192845.png)

```bash
sudo mkdir /mnt/data-store2
sudo mount /dev/sdc /mnt/data-store2
ls /mnt/data-store2/file.txt
```

I saw the original file restored, confirming the snapshot and restore worked as expected.

---

##  Summary

This is the full lifecycle I demonstrated for an EBS volume:

| Step                  | AWS Console | Terminal |
|-----------------------|-------------|----------|
| Create volume         | ✅           | ❌        |
| Attach volume         | ✅           | ❌        |
| Format & mount        | ❌           | ✅        |
| Create snapshot       | ✅           | ❌        |
| Restore from snapshot | ✅           | ✅        |
