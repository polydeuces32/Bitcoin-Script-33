#include <iostream>
#include <sstream>
#include <stack>
#include <vector>
#include <string>

void run_script(const std::string& script) {
    std::istringstream iss(script);
    std::string token;
    std::vector<std::string> stack;

    std::cout << "▶️ Running: " << script << "\n";

    while (iss >> token) {
        if (token == "OP_DUP") {
            if (stack.empty()) {
                std::cout << "❌ Stack is empty!\n";
                return;
            }
            stack.push_back(stack.back());
        } else if (token == "OP_EQUAL") {
            if (stack.size() < 2) {
                std::cout << "❌ Not enough values on stack!\n";
                return;
            }
            std::string a = stack.back(); stack.pop_back();
            std::string b = stack.back(); stack.pop_back();
            stack.push_back(a == b ? "1" : "0");
        } else if (token == "OP_ADD") {
            if (stack.size() < 2) {
                std::cout << "❌ Not enough numbers to add!\n";
                return;
            }
            int a = std::stoi(stack.back()); stack.pop_back();
            int b = std::stoi(stack.back()); stack.pop_back();
            stack.push_back(std::to_string(a + b));
        } else {
            stack.push_back(token);
        }
    }

    std::cout << "📦 Final Stack:\n";
    for (const auto& item : stack) {
        std::cout << "  " << item << "\n";
    }
}

int main() {
    std::string last_script;
    int choice;

    while (true) {
        std::cout << "\n=== Bitcoin Script Puzzle Game ===\n";
        std::cout << "[1] Enter Script\n";
        std::cout << "[2] Load Sample Puzzle\n";
        std::cout << "[3] Replay Last Script\n";
        std::cout << "[4] Exit\n";
        std::cout << "Choose an option: ";
        std::cin >> choice;
        std::cin.ignore();  // clear newline

        if (choice == 1) {
            std::cout << "Enter script: ";
            std::getline(std::cin, last_script);
            run_script(last_script);
        } else if (choice == 2) {
            last_script = "OP_1 OP_DUP OP_EQUAL";
            std::cout << "🧩 Sample puzzle loaded!\n";
            run_script(last_script);
        } else if (choice == 3) {
            if (last_script.empty()) {
                std::cout << "⚠️ No previous script.\n";
            } else {
                run_script(last_script);
            }
        } else if (choice == 4) {
            std::cout << "👋 Goodbye!\n";
            break;
        } else {
            std::cout << "Invalid choice.\n";
        }
    }

    return 0;
}

