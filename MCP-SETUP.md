# MCP (Model Context Protocol) Setup Guide

## 🚀 Overview

This project is configured with multiple MCP servers to provide enhanced development capabilities. MCP allows AI assistants to interact with external tools and services directly.

## 🔧 Current MCP Servers

### **1. Convex MCP Server**
- **Purpose**: Database management and real-time sync
- **Command**: `npx -y convex@latest mcp start`
- **Features**:
  - Database queries and mutations
  - Real-time subscriptions
  - Schema management
  - Function deployment

### **2. shadcn/ui MCP Server**
- **Purpose**: UI component management
- **Command**: `npx -y shadcn-ui-mcp-server`
- **Environment**: `GITHUB_TOKEN` (configured)
- **Features**:
  - Component installation
  - Component search and examples
  - Theme customization
  - Component documentation

### **3. Firecrawl MCP Server**
- **Purpose**: Web scraping and content extraction
- **Command**: `npx -y firecrawl-mcp`
- **Environment**: `FIRECRAWL_API_KEY` (configured)
- **Features**:
  - Web page scraping
  - Content extraction
  - Search functionality
  - Batch processing

### **4. Cloudflare Workers Bindings MCP Server**
- **Purpose**: Cloudflare infrastructure management
- **Command**: `npx mcp-remote https://bindings.mcp.cloudflare.com/sse`
- **Features**:
  - KV Namespace management
  - R2 Bucket operations
  - D1 Database management
  - Workers deployment
  - Hyperdrive configuration

## 📋 Setup Instructions

### **Prerequisites**
- Node.js 18+ installed
- Cursor IDE with MCP support
- Cloudflare account (for Cloudflare MCP)

### **Installation Steps**

1. **Restart Cursor IDE**
   ```bash
   # Close and reopen Cursor to load new MCP configuration
   ```

2. **Authenticate with Cloudflare**
   - A browser window will open for OAuth authentication
   - Grant permissions to access your Cloudflare account
   - Complete the authentication flow

3. **Verify MCP Servers**
   - Check that all MCP servers are running
   - Test basic functionality with each server

## 🛠️ Usage Examples

### **Convex MCP Usage**
```bash
# List all Convex functions
# Query database
# Deploy functions
# Manage schema
```

### **shadcn/ui MCP Usage**
```bash
# Install new components
# Search for components
# Get component examples
# Customize themes
```

### **Firecrawl MCP Usage**
```bash
# Scrape web pages
# Extract content
# Search the web
# Process multiple URLs
```

### **Cloudflare MCP Usage**
```bash
# List Cloudflare accounts
# Manage KV namespaces
# Create R2 buckets
# Query D1 databases
# Deploy Workers
```

## 🔐 Environment Variables

### **Required Environment Variables**
```bash
# shadcn/ui MCP
GITHUB_TOKEN=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

# Firecrawl MCP
FIRECRAWL_API_KEY=fc-68ab01eb5d9946bd880f52c3d6118414

# Cloudflare MCP
# No additional environment variables needed (uses OAuth)
```

### **Optional Environment Variables**
```bash
# Convex MCP
CONVEX_DEPLOY_KEY=your_deploy_key
CONVEX_URL=your_convex_url

# Custom MCP servers
CUSTOM_MCP_API_KEY=your_api_key
```

## 📊 MCP Server Capabilities

### **Convex MCP Server**
| Capability | Description | Example Use Case |
|------------|-------------|------------------|
| Database Queries | Query Convex database | Get user data, analytics |
| Real-time Updates | Subscribe to changes | Live dashboard updates |
| Schema Management | Manage database schema | Add new tables, fields |
| Function Deployment | Deploy Convex functions | Update business logic |

### **shadcn/ui MCP Server**
| Capability | Description | Example Use Case |
|------------|-------------|------------------|
| Component Installation | Install UI components | Add new UI elements |
| Component Search | Find components by keyword | Search for specific UI patterns |
| Component Examples | Get usage examples | Learn component usage |
| Theme Customization | Customize design system | Update colors, typography |

### **Firecrawl MCP Server**
| Capability | Description | Example Use Case |
|------------|-------------|------------------|
| Web Scraping | Extract content from URLs | Research, content aggregation |
| Content Extraction | Structured data extraction | Parse articles, products |
| Web Search | Search the web | Find relevant information |
| Batch Processing | Process multiple URLs | Bulk content extraction |

### **Cloudflare MCP Server**
| Capability | Description | Example Use Case |
|------------|-------------|------------------|
| KV Namespaces | Key-value storage | Caching, configuration |
| R2 Buckets | Object storage | File uploads, static assets |
| D1 Databases | SQLite databases | Data storage, analytics |
| Workers | Serverless functions | API endpoints, edge computing |
| Hyperdrive | Database acceleration | Performance optimization |

## 🚨 Troubleshooting

### **Common Issues**

#### **MCP Server Not Starting**
```bash
# Check Node.js version
node --version

# Update npm packages
npm update -g

# Clear npm cache
npm cache clean --force
```

#### **Authentication Issues**
```bash
# Cloudflare OAuth
# Clear browser cache and retry authentication

# GitHub Token
# Verify token has correct permissions
# Regenerate token if expired
```

#### **Network Issues**
```bash
# Check internet connection
# Verify firewall settings
# Test MCP server URLs manually
```

### **Debug Commands**
```bash
# Check MCP server status
npx mcp-remote --help

# Test Convex connection
npx convex dev

# Verify shadcn/ui installation
npx shadcn-ui-mcp-server --version

# Test Firecrawl API
curl -H "Authorization: Bearer $FIRECRAWL_API_KEY" https://api.firecrawl.dev/v0/health
```

## 🔄 Maintenance

### **Regular Updates**
- **Monthly**: Update MCP server packages
- **Quarterly**: Review and rotate API keys
- **As needed**: Update MCP server configurations

### **Security Best Practices**
- Rotate API keys regularly
- Use environment variables for sensitive data
- Monitor MCP server access logs
- Keep MCP server packages updated

### **Performance Monitoring**
- Monitor MCP server response times
- Track API usage and limits
- Optimize queries and requests
- Cache frequently accessed data

## 📚 Additional Resources

### **Documentation**
- [Convex Documentation](https://docs.convex.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Firecrawl Documentation](https://docs.firecrawl.dev)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

### **MCP Protocol**
- [MCP Specification](https://modelcontextprotocol.io)
- [MCP Client Implementation](https://github.com/modelcontextprotocol)

### **Community**
- [Convex Discord](https://discord.gg/convex)
- [shadcn/ui Discord](https://discord.gg/shadcn)
- [Cloudflare Community](https://community.cloudflare.com)

---

## 🎯 Integration with UI/UX Changes

### **Using MCP for UI/UX Development**

#### **Component Management**
```bash
# Install new UI components during redesign
# Search for specific component patterns
# Get examples and documentation
# Customize themes and styling
```

#### **Content Management**
```bash
# Scrape design inspiration from web
# Extract content for new pages
# Research competitor designs
# Gather user feedback and testimonials
```

#### **Infrastructure Management**
```bash
# Set up CDN for new assets
# Configure caching for performance
# Deploy new Workers for functionality
# Manage databases for new features
```

#### **Database Management**
```bash
# Update schema for new features
# Deploy new functions for UI interactions
# Manage real-time updates for new components
# Optimize queries for better performance
```

---

*Last Updated: 2024-12-19*
*MCP Setup Version: 1.0*
*Next Review: After UI/UX changes*
