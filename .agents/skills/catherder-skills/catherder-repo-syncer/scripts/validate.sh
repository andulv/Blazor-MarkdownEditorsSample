#!/usr/bin/env bash
# SCRIPT_ID:   validate.sh
# PURPOSE:     Validate the catherder-repo-syncer skill with skills-ref.
# USAGE:       bash scripts/validate.sh <skill-dir>
# ARGS:        skill-dir (required) - path to the skill folder root
# OUTPUT:      stdout — validation results from skills-ref
# EXIT:        0=pass  1=errors-found  2=usage-or-config-error  127=skills-ref-not-found
# DEPS:        skills-ref (on PATH or at ../../../../.venv/bin/skills-ref)
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 path/to/skill" >&2
  exit 2
fi

skill_dir="$1"

if [[ ! -f "$skill_dir/SKILL.md" ]]; then
  echo "No SKILL.md found at: $skill_dir" >&2
  exit 2
fi

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
venv_skills_ref="$script_dir/../../../../.venv/bin/skills-ref"

if command -v skills-ref >/dev/null 2>&1; then
  exec skills-ref validate "$skill_dir"
elif [[ -x "$venv_skills_ref" ]]; then
  exec "$venv_skills_ref" validate "$skill_dir"
else
  echo "skills-ref not found on PATH or at $venv_skills_ref" >&2
  exit 127
fi
