namespace :deploy do
  namespace :assets do
    # Rake::Task["precompile"].clear_actions
    # Rake::Task["backup_manifest"].clear_actions
  end

  desc 'Run rake npm:install'
  task :npm_install do
    on roles(:web) do
      within release_path do
        execute("cd #{release_path} && npm install")
        execute("cd #{release_path}/client && npm install")
      end
    end
  end
end
