#!/bin/sh
set -eu

name=${npm_package_name}
bundle="resources/extension-${name}.js"
archive="dist/${name}.tar.gz"

tar --sort=name --mtime=@0 --owner=0 --group=0 --numeric-owner -czf "$archive" -C dist "$bundle"
test "$(tar -tzf "$archive")" = "$bundle"
printf 'Package allowlist passed: %s\n' "$archive"
