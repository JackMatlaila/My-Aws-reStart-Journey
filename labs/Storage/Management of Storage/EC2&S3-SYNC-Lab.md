
# ☁️ EC2 Snapshot & S3 Sync Workflow Walkthrough

This is my personal, reproducible walkthrough of how I created EC2 snapshots, synced files from an EBS volume to S3, and used S3 versioning to recover deleted files. Every step is documented in first person, with CLI commands, validation checks, and notes for teaching or auditing.

---

## 🔹 Step 1: Create and Maintain EC2 Snapshots

I began by stopping my EC2 instance to ensure filesystem consistency, then created and validated an EBS snapshot.

### Stop the EC2 instance
```bash
aws ec2 stop-instances --instance-ids i-xxxxxxxxxxxxxxxxx
aws ec2 wait instance-stopped --instance-ids i-xxxxxxxxxxxxxxxxx
```

![001](Screenshot%202025-11-26%20194913.png)

### Create a snapshot of the attached EBS volume
```bash
aws ec2 create-snapshot --volume-id vol-xxxxxxxxxxxxxxxxx --description "Backup snapshot"
```

![002](Screenshot%202025-11-26%20194943.png)

### Wait for snapshot completion
```bash
aws ec2 wait snapshot-completed --snapshot-id snap-xxxxxxxxxxxxxxxxx
```

### Validate snapshot
```bash
aws ec2 describe-snapshots --snapshot-ids snap-xxxxxxxxxxxxxxxxx
```

### Restart the EC2 instance
```bash
aws ec2 start-instances --instance-ids i-xxxxxxxxxxxxxxxxx
aws ec2 wait instance-running --instance-ids i-xxxxxxxxxxxxxxxxx
```

---

## 🔹 Step 2: Sync EBS Volume Files to Amazon S3

I mirrored my local folder to S3, first without deletion, then with deletion enabled once versioning was active.

### Sync files to S3
```bash
aws s3 sync /home/ec2-user/files s3://your-bucket-name
```

### Enable deletion sync (safe with versioning)
```bash
aws s3 sync /home/ec2-user/files s3://your-bucket-name --delete
```
![003](Screenshot%202025-11-26%20195127.png)
> **Note:** With versioning enabled, deleted files are preserved as older versions.

---

## 🔹 Step 3: Enable Versioning on the S3 Bucket

I activated versioning to protect against accidental deletions.

### Enable versioning
```bash
aws s3api put-bucket-versioning \
  --bucket your-bucket-name \
  --versioning-configuration Status=Enabled
```

### Confirm versioning
```bash
aws s3api get-bucket-versioning --bucket your-bucket-name
```

---

## 🔹 Step 4: Recover Deleted Files Using Versioning

I tested recovery by deleting a file locally, syncing with `--delete`, and restoring the prior version.

### List all versions of a file
```bash
aws s3api list-object-versions \
  --bucket your-bucket-name \
  --prefix files/file2.txt
```

![004](Screenshot%202025-11-26%20195141.png)

### Download a previous version
```bash
aws s3api get-object \
  --bucket your-bucket-name \
  --key files/file2.txt \
  --version-id <VERSION_ID> \
  restored-file2.txt
```

### (Optional) Re-upload restored file
```bash
aws s3 cp restored-file2.txt s3://your-bucket-name/files/file2.txt
```

---

## 🔹 IAM Role and Least Privilege

I used an EC2 instance profile with a scoped IAM policy to securely access EC2 and S3.  
This ensured least-privilege permissions for snapshot creation, S3 sync, and versioning.

![008](Screenshot%202025-11-26%20184825.png)

---

## 🔹 Validation and Auditing

- I always verified snapshot creation with `describe-snapshots`.
- I confirmed S3 sync with `aws s3 ls`.
- I validated versioning with `get-bucket-versioning`.
- I kept screenshots with short, descriptive names for reproducibility.

![006](Screenshot%202025-11-26%20195005.png)

---

## ✅ Final Notes

- Verification is a habit: I never assume success without `describe` or `list`.
- IAM roles > long-lived keys for security.
- Tags make audits and cost allocation easier.
- Versioning is my safety net when using `--delete`.

---

This README doubles as a teaching guide and a reproducible workflow for anyone learning AWS backups and recovery.
