# Buddy Download Package GitHub Action

Download packages from Buddy CI/CD platform in GitHub Actions workflows.

## Features

- Download packages directly in GitHub Actions
- Support for versioned packages (package@version)
- Merge or replace directory contents
- Region support (EU, US, AP)

## Usage

### Basic Usage

```yaml
name: Download
on: [push]

jobs:
  download:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Buddy
        uses: buddy/login@v1
        with:
          token: ${{ secrets.BUDDY_TOKEN }}
          region: 'US'

      - name: Download package
        uses: buddy/download-package@v1
        with:
          workspace: my-workspace
          project: my-project
          identifier: my-package
          directory: ./packages
```

### Download Specific Version

```yaml
- name: Download versioned package
  uses: buddy/download-package@v1
  with:
    workspace: my-workspace
    project: my-project
    identifier: my-package@1.0.0
    directory: ./packages
```

### Merge With Existing Directory

```yaml
- name: Download and merge
  uses: buddy/download-package@v1
  with:
    workspace: my-workspace
    project: my-project
    identifier: my-package
    directory: ./packages
    merge: true
```

### Replace Directory Contents

```yaml
- name: Download and replace
  uses: buddy/download-package@v1
  with:
    workspace: my-workspace
    project: my-project
    identifier: my-package
    directory: ./packages
    replace: true
```

### With Region Override

```yaml
- name: Download from specific region
  uses: buddy/download-package@v1
  with:
    workspace: my-workspace
    project: my-project
    identifier: my-package
    directory: ./packages
    region: AP  # EU, US, or AP
```

## Inputs

| Input        | Required | Description                                                              |
| ------------ | -------- | ------------------------------------------------------------------------ |
| `workspace`  | Yes      | Buddy workspace domain                                                   |
| `project`    | Yes      | Buddy project name (URL handle)                                          |
| `identifier` | Yes      | Package identifier with optional version (e.g., `my-package@1.0.0`)      |
| `directory`  | Yes      | Path to the directory to download to                                     |
| `merge`      | No       | Merge contents of the directory with package (`true`/`false`)            |
| `replace`    | No       | Replace contents of the directory with package (`true`/`false`)          |
| `region`     | No       | Override default region: `EU`, `US`, or `AP`                             |
| `api`        | No       | Override API URL                                                         |

## Outputs

| Output         | Description                              |
| -------------- | ---------------------------------------- |
| `package_path` | The path where the package was downloaded |

## Environment Variables

The action exports the following environment variables for use in subsequent steps:

| Variable             | Description                              |
| -------------------- | ---------------------------------------- |
| `BUDDY_PACKAGE_PATH` | The path where the package was downloaded |

## Prerequisites

This action requires authentication with Buddy. Use the [`buddy/login`](https://github.com/buddy/login) action before downloading packages:

```yaml
- name: Login to Buddy
  uses: buddy/login@v1
  with:
    token: ${{ secrets.BUDDY_TOKEN }}
    region: 'US'
```

The login action sets the following environment variables that are used by this action:
- `BUDDY_TOKEN` - Authentication token
- `BUDDY_API_ENDPOINT` - API endpoint URL

### BDY CLI Installation

By default, this action automatically installs the latest BDY CLI from the production channel. If you need a specific version or channel, use the `buddy/setup` action first:

```yaml
- name: Setup BDY CLI
  uses: buddy/setup@v1
  with:
    version: '1.12.8'
```

See the [`buddy/setup`](https://github.com/buddy/setup) action for more options.

## License

MIT - See [LICENSE.md](LICENSE.md) for details.