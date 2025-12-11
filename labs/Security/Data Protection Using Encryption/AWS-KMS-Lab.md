
# Data Protection Using AWS Encryption

I documented the steps I followed to set up and use AWS KMS with the AWS Encryption CLI. This guide walks through everything I did, from prerequisites to cleanup.

---

## Prerequisites

Before I started, I made sure I had:

- **AWS account:** with permissions to create and manage KMS keys and IAM roles.  
- **IAM role or user:** with sufficient permissions (KMS, IAM, and EC2/SSM if using a managed environment).  
- **AWS CLI installed:** Version 2 recommended.  
- **Python and pip:** required to install the AWS Encryption CLI.  

---

## Configuring AWS CLI Credentials

I set up my AWS CLI credentials and default region.

1. I ran:

   ```bash
   aws configure
   ```

   - **Access key ID:** I entered my AWS access key.  
   - **Secret access key:** I entered my AWS secret.  
   - **Default region:** I used `us-west-2`.  
   - **Output format:** I left it blank (JSON works too).  

![1](Screenshot%202025-11-24%20150817.png)

2. To verify, I checked my credentials file:

   ```bash
   cat ~/.aws/credentials
   ```

> I prefer using temporary credentials with IAM roles when possible and rotate my keys regularly.

---

## Creating a KMS Symmetric Key

I created a symmetric KMS key configured for encrypt/decrypt operations.

1. **Key type:** I chose **Symmetric**.  

![00](Screenshot%202025-11-24%20144525.png)

2. **Key usage:** I set it to **Encrypt and decrypt**.  
3. **Labels:**  
   - Alias: `MyKMSKey`  
   - Description: Key used to encrypt and decrypt data files  

![01](Screenshot%202025-11-24%20144553.png)

4. **Key administrators:** I added IAM roles/users (e.g., `voclabs`) to administer the key.  

![02](Screenshot%202025-11-24%20144625.png)

5. **Key users:** I added IAM roles/users allowed to use the key in cryptographic operations.  
6. **Key ARN:** I copied the Key ARN and noted the alias `alias/MyKMSKey`.

> I kept the alias memorable, using environment-specific aliases like `alias/prod-data-key`.

---

## Installing the AWS Encryption CLI

I installed the CLI and ensured my PATH was set correctly.

1. Installed via pip:

   ```bash
   pip3 install aws-encryption-sdk-cli
   ```

![2](Screenshot%202025-11-24%20150908.png)

2. Exported local bin to PATH:

   ```bash
   export PATH=$PATH:/home/ssm-user/.local/bin
   ```

![002](Screenshot%202025-11-24%20150929.png)

3. Verified installation:

   ```bash
   aws-encryption-cli --version
   ```

---

## Encrypting Plaintext

I tested encryption with a sample file.

1. Created sample files:

   ```bash
   touch secret1.txt secret2.txt secret3.txt
   echo 'TOP SECRET !!!!' > secret1.txt
   cat secret1.txt
   ```

![3](Screenshot%202025-11-24%20150951.png)

2. Encrypted with my key alias:

   ```bash
   aws-encryption-cli --encrypt \
     --input secret1.txt \
     --wrapping-keys key=alias/MyKMSKey \
     --metadata-output ~/metadata \
     --encryption-context purpose=test \
     --commitment-policy require-encrypt-require-decrypt \
     --output ~/output/
   ```

3. Confirmed output:

   ```bash
   ls -la ~/output/
   ```

---

## Decrypting Ciphertext

I decrypted the file using the same key and encryption context.

1. Set an environment variable for my key ARN:

   ```bash
   export KEY_ARN=<my-key-arn>
   ```

2. Decrypted the file:

   ```bash
   aws-encryption-cli --decrypt \
     --input ~/output/secret1.txt.encrypted \
     --wrapping-keys key=$KEY_ARN \
     --commitment-policy require-encrypt-require-decrypt \
     --encryption-context purpose=test \
     --metadata-output ./metadata \
     --max-encrypted-data-keys 1 \
     --buffer \
     --output .
   ```

3. Verified plaintext:

   ```bash
   cat ./secret1.txt
   ```

---

## Troubleshooting

- **AccessDeniedException:** I ensured my IAM role/user was listed as a key user in the key policy.  
- **Key not found:** I confirmed the alias or ARN was correct and matched the region.  
- **PATH issues:** I added `~/.local/bin` to PATH if the CLI wasn’t found.  
- **Region mismatch:** I made sure my AWS CLI region matched the key’s region.  

---

## Cleanup

When I was done, I cleaned up test files:

```bash
rm -f secret1.txt secret2.txt secret3.txt ~/output/secret1.txt.encrypted
```

I also reviewed key rotation policies, considered enabling automatic rotation, and audited key usage with CloudTrail and KMS metrics.

---
