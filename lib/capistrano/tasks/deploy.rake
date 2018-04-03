namespace :deploy do
  namespace :assets do
    # Rake::Task["precompile"].clear_actions
    # Rake::Task["backup_manifest"].clear_actions
  end

  desc 'Run rake yarn:install'
  task :yarn_install do
    on roles(:web) do
      within release_path do
        execute("cd #{release_path} && yarn install")
        execute("cd #{release_path}/client && yarn install")
      end
    end
  end
end
