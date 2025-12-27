# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this template, please **do not** open a public issue. Instead:

1. **Use GitHub Security Advisory**: Use GitHub's private vulnerability reporting feature (if enabled)
2. **Email**: Contact the repository maintainer directly (check GitHub profile for contact information)

### What to Include

When reporting a vulnerability, please include:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if you have one)

### Response Timeline

- We will acknowledge receipt of your report within 48 hours
- We will provide an initial assessment within 7 days
- We will keep you informed of our progress

### Disclosure Policy

- We will work with you to understand and resolve the issue quickly
- We will not disclose the vulnerability publicly until a fix is available
- We will credit you for the discovery (unless you prefer to remain anonymous)

## Security Best Practices for Your Portfolio

When using this template for your own portfolio:

1. **Never commit `.env.local`** - It's already in `.gitignore`, but double-check
2. **Keep dependencies updated** - Run `npm audit` regularly and update packages
3. **Use environment variables** - Never hardcode API keys or sensitive data
4. **Review third-party integrations** - Understand what data you're sharing with Hashnode, SendGrid, etc.

Thank you for helping keep this project secure!

