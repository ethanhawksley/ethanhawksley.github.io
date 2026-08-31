---
title: '500 Milliseconds'
index: 7
---

Rewind back a month to late February. XZ Utils 5.6.0 had just been released, and a man called Andres Freund was performing tests. Andres was a software engineer at Microsoft, where he was paid to improve PostgreSQL - a free, community-designed database. Even the biggest companies like Spotify and Netflix used it. He had been developing PostgreSQL since 2009, with various companies paying him to do so. He had a fine eye for performance, with his primary goal being to optimise PostgreSQL to be as fast as possible. 

This time, whilst Andres was testing PostgreSQL's performance, he noticed errors in the Valgrind debugger. They pointed towards the latest XZ Utils update, but Valgrind was well known for flagging even inconsequential issues. Andres shelved the errors to the back of his mind, and moved on.

---

A month of working on PostgreSQL came and went. It was March 27th, and Andres was testing PostgreSQL's performance on another server.
In order for his benchmarks to be as accurate as possible, he wanted to free up more processing power.

On the internet, there are hundreds of automated scanners that try connecting to servers through OpenSSH. Andres' server was no different: the server's logs showed plenty of failed log-in attempts. However, something in the logs caught his eye...

Connection attempts were taking five hundred milliseconds too long. As a rule of thumb, a normal attempt takes about three hundred milliseconds, but these took eight hundred instead. Most people would have ignored it, or perhaps filed a bug report. Andres Freund was not most people - he had to understand what was causing it.

He used his performance expertise to investigate why exactly OpenSSH was slow. The culprit was clear: XZ Utils had something running very slowly.
Andres remembered the PostgreSQL errors he saw back in February, and how XZ Utils was the culprit there too. He concluded there must have been an underlying reason.

When he investigated deeper, he immediately faced an issue. Every time he tested OpenSSH with a debugger, it behaved perfectly. He grew suspicious, it sounded exactly like a program trying to hide something. He tried several other debuggers, but none worked. The program would run perfectly every time without issue.

When all hope seemed lost, he remembered another debugger named Intel Processor Trace. Unlike other debuggers, this ran on the hardware. Programs couldn't even tell it was running, and that included OpenSSH. Andres watched as the entire backdoor unfolded before him.

It was growing late, so he decided to call it for the night. Before he went to sleep, he sent an email to Debian's security team. He warned there was something seriously wrong with XZ Utils, and he would have more information tomorrow.

---

The next day at work, Andres kept thinking about XZ Utils. He couldn't focus on his meetings: he knew he was sitting on a backdoor that could be triggered at any moment. As soon as he was finished with work for the day, he went straight to investigating again.

He knew there was a backdoor in the program, but he didn't know how it got there. He read the source code online though nothing seemed suspicious. Andres decided to sanity-check himself and compare the source code with what was actually in each update.

He spotted it. In the script that compiled the update's code, there were a few extra lines. In isolation, it looked entirely innocuous. With Andres' understanding, however, it explained every question he had. The script was heavily obfuscated, but he dissected the code and saw it load the malicious test files, decipher the backdoor, and compromise XZ Utils. When he checked who added this code, there was only one name: Jia Tan.
