import { resolve } from 'node:path'
import { exportVariable, info, setOutput, setSecret } from '@actions/core'
import type { IInputs } from '@/types/inputs'
import type { IOutputs } from '@/types/outputs'
import { executeCommand } from '@/utils/command'

export function checkBuddyCredentials(): void {
  const token = process.env.BUDDY_TOKEN
  const endpoint = process.env.BUDDY_API_ENDPOINT

  if (!token) {
    throw new Error(
      'BUDDY_TOKEN is not set. Please use the buddy/login@v1 action before downloading packages.',
    )
  }

  if (!endpoint) {
    throw new Error(
      'BUDDY_API_ENDPOINT is not set. Please use the buddy/login@v1 action before downloading packages.',
    )
  }

  setSecret(token)
  info('Buddy credentials found')
}

export async function downloadPackage(inputs: IInputs): Promise<IOutputs> {
  info(`Downloading package: ${inputs.identifier} to ${inputs.directory}`)

  const args = [
    'package',
    'download',
    inputs.identifier,
    inputs.directory,
    '--workspace',
    inputs.workspace,
    '--project',
    inputs.project,
  ]

  if (inputs.merge) {
    args.push('--merge')
    info('Will merge contents with existing directory')
  }

  if (inputs.replace) {
    args.push('--replace')
    info('Will replace contents of the directory')
  }

  await executeCommand(process.env.BDY_PATH || 'bdy', args)

  const packagePath = resolve(inputs.directory)
  const outputs: IOutputs = { packagePath }

  setOutput('package_path', packagePath)
  exportVariable('BUDDY_PACKAGE_PATH', packagePath)

  return outputs
}
