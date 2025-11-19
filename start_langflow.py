import sys
# 1. FORCE THE NEW DATABASE
import os
# DISABLE AUTH CHECK
os.environ["LANGFLOW_SKIP_AUTH_AUTO_LOGIN"] = "true"

# ... rest of your code ...
__import__('pysqlite3')
sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')

import runpy

# 2. TRICK LANGFLOW INTO THINKING WE RAN THE STANDARD COMMAND
sys.argv = ["langflow", "run"]

# 3. START THE APP
runpy.run_module('langflow', run_name='__main__')