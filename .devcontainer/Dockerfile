# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.209.6/containers/rust/.devcontainer/base.Dockerfile

# [Choice] Debian OS version (use bullseye on local arm64/Apple Silicon): buster, bullseye
ARG VARIANT="buster"
FROM mcr.microsoft.com/vscode/devcontainers/rust:0-${VARIANT}

# Install needed packages and setup non-root user. Use a separate RUN statement to add your own dependencies.
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# [Optional] Uncomment this section to install additional packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# Cargo
RUN su vscode -c "cargo install cargo-edit cargo-watch cargo-make cargo-generate wasm-pack"

# Starship
RUN sh -c "$(curl -fsSL https://starship.rs/install.sh)" -- --yes \
    && rm -rf /home/"${USERNAME}"/.zshrc \
    && echo 'eval "$(starship init zsh)"' >> /home/"${USERNAME}"/.zshrc
